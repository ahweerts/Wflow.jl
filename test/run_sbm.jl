using Dates

tomlpath = joinpath(@__DIR__, "sbm_config.toml")
config = Wflow.Config(tomlpath)

model = Wflow.initialize_sbm_model(config)
@unpack network = model

Wflow.load_dynamic_input!(model)
model = Wflow.update(model)

# test if the first timestep was written to the CSV file
flush(model.writer.csv_io)  # ensure the buffer is written fully to disk
@testset "CSV output" begin
    row = csv_first_row(model.writer.csv_path)

    @test row.time == DateTime("2000-01-02T00:00:00")
    @test row.Q ≈ 8.1396354649197f0
    @test row.volume ≈ 2.7535003939625636f7
    @test row.temp_bycoord ≈ 2.390000104904175f0
    @test row.vwc_layer2_bycoord ≈ 0.2593308940855637f0
    @test row.temp_byindex ≈ 2.390000104904175f0
    @test row.Q_6336050 ≈ 0.006160282939850074f0
    @test row.Q_6336510 ≈ 0.029193719816289154f0
    @test row.Q_6836100 ≈ 0.19621282450614713f0
    @test row.Q_6336500 ≈ 0.006089112638001381f0
    @test row.Q_6836190 ≈ 0.0031262850749354237f0
    @test row.Q_6336800 ≈ 0.007774627197336106f0
    @test row.Q_6336900 ≈ 0.006406452797458412f0
    @test row.Q_6336930 ≈ 0.08892572315015423f0
    @test row.Q_6336910 ≈ 0.007077511572710953f0
    @test row.Q_6136500 ≈ 0.0016367337487926633f0
    @test row.Q_6136520 ≈ 0.0020860051276639217f0
    @test row.Q_6136150 ≈ 0.006101486405738522f0
    @test row.Q_6136151 ≈ 0.007650413708745673f0
    @test row.Q_6136160 ≈ 3.9199531493174726f0
    @test row.Q_6136202 ≈ 1.4125847550988493f0
    @test row.recharge_1 ≈ -0.018503778779640385f0
end

@testset "NetCDF scalar output" begin
    ds = model.writer.dataset_scalar
    @test ds["time"][1] == DateTime("2000-01-02T00:00:00")
    @test ds["Q"][:][1:20] ≈ [
        0.73993874f0,
        1.4125848f0,
        1.4389194f0,
        1.4036233f0,
        5.7276225f0,
        2.7586424f0,
        2.1080604f0,
        4.1026044f0,
        0.008365918f0,
        3.919953f0,
        4.0615087f0,
        0.006050462f0,
        0.0076436345f0,
        0.00780229f0,
        0.00346879f0,
        0.7066179f0,
        0.0022446192f0,
        1.3323202f0,
        3.8271446f0,
        1.6729931f0,
    ]
    @test ds["Q_gauges"].attrib["cf_role"] == "timeseries_id"
    @test ds["temp_index"][:] ≈ [2.39f0]
    @test ds["temp_coord"][:] ≈ [2.39f0]
    @test keys(ds.dim) == ["time", "layer", "Q_gauges", "temp_bycoord", "temp_byindex"]
end

@testset "first timestep" begin
    sbm = model.vertical

    @test sbm.tt[50063] ≈ 0.0f0

    @test model.clock.iteration == 2

    @test sbm.θₛ[50063] ≈ 0.48755401372909546f0
    @test sbm.θᵣ[50063] ≈ 0.15943120419979095f0
    @test sbm.runoff[50063] == 0.0
    @test sbm.soilevap[50063] == 0.0
    @test sbm.snow[5] ≈ 3.592840840467347f0
end

# run the second timestep
Wflow.load_dynamic_input!(model)
model = Wflow.update(model)

@testset "second timestep" begin
    sbm = model.vertical
    @test sbm.θₛ[50063] ≈ 0.48755401372909546f0
    @test sbm.θᵣ[50063] ≈ 0.15943120419979095f0
    @test sbm.runoff[50063] == 0.0
    @test sbm.soilevap[50063] ≈ 0.006358004660566856f0
    @test sbm.snow[5] ≈ 3.667748983774868f0
end

@testset "subsurface flow" begin
    ssf = model.lateral.subsurface.ssf
    @test sum(ssf) ≈ 6.3758350089071155f7
    @test ssf[network.land.order[1]] ≈ 718.2430089056409f0
    @test ssf[network.land.order[end-100]] ≈ 2338.193520999003f0
    @test ssf[network.land.order[end]] ≈ 288.19428729403944f0
end

@testset "overland flow" begin
    q = model.lateral.land.q_av
    @test sum(q) ≈ 290.86598455446057f0
    @test q[26625] ≈ 0.0
    @test q[39308] ≈ 0.0
    @test q[network.land.order[end]] ≈ 1.0f-30
end

@testset "river flow" begin
    q = model.lateral.river.q_av
    @test sum(q) ≈ 3617.2622202137377f0
    @test q[1622] ≈ 0.0005996452764365753f0
    @test q[43] ≈ 12.044822137080077f0
    @test q[network.river.order[end]] ≈ 0.03835913312643948f0
end

@testset "reservoir simple" begin
    res = model.lateral.river.reservoir
    @test res.outflow[1] ≈ 0.21750000119148086f0
    @test res.inflow[1] ≈ 43.18479982574888f0
    @test res.volume[1] ≈ 2.751299001489657f7
    @test res.precipitation[1] ≈ 0.17999997735023499f0
    @test res.evaporation[1] ≈ 0.5400000810623169f0
end

# set these variables for comparison in "changed dynamic parameters"
precip = copy(model.vertical.precipitation)
evap = copy(model.vertical.potential_evaporation)
lai = copy(model.vertical.leaf_area_index)
res_evap = copy(model.lateral.river.reservoir.evaporation)

Wflow.close_files(model, delete_output = false)

# test for setting a pit and multithreading multiple basins (by setting 2 extra pits
# resulting in 3 basins)
tomlpath = joinpath(@__DIR__, "sbm_config.toml")
config = Wflow.Config(tomlpath)
config["model"]["pits"] = true
config["input"]["pits"] = "wflow_pits"
config.endtime = DateTime(2000, 1, 9)
config.loglevel = "info"

model = Wflow.run(config)

@testset "timing" begin
    # clock has been reset
    calendar = get(config, "calendar", "standard")::String
    @test model.clock.time == Wflow.cftime(config.starttime, calendar)
    @test model.clock.iteration == 1
end

@testset "river flow at basin outlets and downstream of one pit" begin
    q = model.lateral.river.q_av
    @test q[4009] ≈ 8.631850808685403f0 # pit/ outlet, CartesianIndex(141, 228)
    @test q[4020] ≈ 0.006779014715290862f0 # downstream of pit 4009, CartesianIndex(141, 229)
    @test q[2508] ≈ 150.4832123069274f0 # pit/ outlet
    @test q[5808] ≈ 0.12647045717787547f0 # pit/ outlet
end

# test changing forcing and cyclic LAI parameter
tomlpath = joinpath(@__DIR__, "sbm_config.toml")
config = Wflow.Config(tomlpath)

config.input.vertical.precipitation =
    Dict("scale" => 2.0, "netcdf" => Dict("variable" => Dict("name" => "precip")))
config.input.vertical.potential_evaporation = Dict(
    "scale" => 3.0,
    "offset" => 1.50,
    "netcdf" => Dict("variable" => Dict("name" => "pet")),
)
config.input.vertical.leaf_area_index =
    Dict("scale" => 1.6, "netcdf" => Dict("variable" => Dict("name" => "LAI")))

model = Wflow.initialize_sbm_model(config)
Wflow.load_dynamic_input!(model)
model = Wflow.update(model)
Wflow.load_dynamic_input!(model)
model = Wflow.update(model)

@testset "changed dynamic parameters" begin
    res = model.lateral.river.reservoir
    vertical = model.vertical
    @test vertical.precipitation[2] / precip[2] ≈ 2.0f0
    @test (vertical.potential_evaporation[100] - 1.50) / evap[100] ≈ 3.0f0
    @test vertical.leaf_area_index[100] / lai[100] ≈ 1.6f0
    @test (res.evaporation[2] - 1.50) / res_evap[2] ≈ 3.0000012203408635f0
end

# test cyclic river inflow
tomlpath = joinpath(@__DIR__, "sbm_config.toml")
config = Wflow.Config(tomlpath)

config.input.cyclic = ["vertical.leaf_area_index", "lateral.river.inflow"]
config.input.lateral.river.inflow = "inflow"

model = Wflow.initialize_sbm_model(config)
Wflow.load_dynamic_input!(model)
model = Wflow.update(model)
Wflow.load_dynamic_input!(model)
model = Wflow.update(model)

@testset "river inflow (cyclic)" begin
    @test model.lateral.river.inflow[44] ≈ 0.75
    @test model.lateral.river.q_av[44] ≈ 10.70572252638057
end

# test fixed forcing (precipitation = 2.5)
config = Wflow.Config(tomlpath)
config.input.vertical.precipitation = Dict("value" => 2.5)
model = Wflow.initialize_sbm_model(config)
Wflow.load_fixed_forcing(model)

@testset "fixed precipitation forcing (initialize)" begin
    @test maximum(model.vertical.precipitation) ≈ 2.5
    @test minimum(model.vertical.precipitation) ≈ 0.0
    @test all(isapprox.(model.lateral.river.reservoir.precipitation, 2.5))
end

Wflow.load_dynamic_input!(model)
model = Wflow.update(model)

@testset "fixed precipitation forcing (first timestep)" begin
    @test maximum(model.vertical.precipitation) ≈ 2.5
    @test minimum(model.vertical.precipitation) ≈ 0.0
    @test all(isapprox.(model.lateral.river.reservoir.precipitation, 2.5))
end

Wflow.close_files(model, delete_output = false)

# test local-inertial option for river flow river_routing
tomlpath = joinpath(@__DIR__, "sbm_config.toml")
config = Wflow.Config(tomlpath)
config.model.river_routing = "local-inertial"

model = Wflow.initialize_sbm_model(config)
Wflow.load_dynamic_input!(model)
model = Wflow.update(model)
Wflow.load_dynamic_input!(model)
model = Wflow.update(model)

@testset "river flow and depth (local inertial)" begin
    q = model.lateral.river.q_av
    @test sum(q) ≈ 3913.2930510491346f0
    @test q[1622] ≈ 6.030323463037494f-5
    @test q[43] ≈ 11.908657947106583f0
    @test q[501] ≈ 3.543422128539327f0
    h = model.lateral.river.h_av
    @test h[1622] ≈ 0.0018123662927896492f0
    @test h[43] ≈ 0.43627044208669874f0
    @test h[501] ≈ 0.056776411776307274f0
end
Wflow.close_files(model, delete_output = false)

# test local-inertial option for river flow river_routing
tomlpath = joinpath(@__DIR__, "sbm_swf_config.toml")
config = Wflow.Config(tomlpath)

model = Wflow.initialize_sbm_model(config)
Wflow.load_dynamic_input!(model)
model = Wflow.update(model)
Wflow.load_dynamic_input!(model)
model = Wflow.update(model)

@testset "river and overland flow and depth (local inertial)" begin
    q = model.lateral.river.q_av
    @test sum(q) ≈ 2379.651432704372f0
    @test q[1622] ≈ 6.035030708428247f-5
    @test q[43] ≈ 5.354996079568972f0
    @test q[501] ≈ 1.585316526329744f0
    h = model.lateral.river.h_av
    @test h[1622] ≈ 0.0018128713506161591f0
    @test h[43] ≈ 0.3003008810153667f0
    @test h[501] ≈ 0.03158153737666437f0
    qx = model.lateral.land.qx
    qy = model.lateral.land.qy
    @test qx[[26, 35, 631]] ≈ [0.18766609022575692f0, 0.0327713959577998f0, 0.0f0]
    @test qy[[26, 35, 631]] ≈ [0.124973621738499f0, 1.722163458992309f0, 0.0f0]
    h = model.lateral.land.h
    @test h[[26, 35, 631]] ≈
          [0.07347422780820778f0, 0.00917333738533491f0, 0.0007130814519314889f0]
end
Wflow.close_files(model, delete_output = false)
