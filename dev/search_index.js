var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = Wflow","category":"page"},{"location":"#Wflow","page":"Home","title":"Wflow","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This is an in development version of wflow, a continuation of the work available here. For now using this for any real calculations is not advised, please use the linked stable wflow release for that.   ","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [Wflow]","category":"page"},{"location":"#Wflow.pcrdir","page":"Home","title":"Wflow.pcrdir","text":"Map from PCRaster LDD value to a CartesianIndex\n\n\n\n\n\n","category":"constant"},{"location":"#Wflow.Config","page":"Home","title":"Wflow.Config","text":"Parsed TOML configuration\n\n\n\n\n\n","category":"type"},{"location":"#Wflow.accucapacityflux-Tuple{Any,Any,Any}","page":"Home","title":"Wflow.accucapacityflux","text":"Transport of material downstream with a limited transport capacity over a directed graph\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.active_indices-Tuple{AbstractArray{T,2} where T,Any}","page":"Home","title":"Wflow.active_indices","text":"active_indices(subcatch_2d, nodata)\n\nTakes a 2D array of the subcatchments. And derive forward and reverse indices.\n\n1: Get a list of CartesianIndex{2}` that are active, based on a nodata value. These map from the 1D internal domain to the 2D external domain.\n\n2: Make a reverse index, a Matrix{Int}`, which maps from the 2D external domain to the 1D internal domain, providing an Int which can be used as a linear index. Values of 0 represent inactive cells.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.acttransp_unsat_sbm","page":"Home","title":"Wflow.acttransp_unsat_sbm","text":"acttransp_unsat_sbm(rootingdepth, ustorelayerdepth, sumlayer, restpotevap, sum_actevapustore, c, usl, θₛ, θᵣ, hb, ust::Bool = false)\n\nCompute actual transpiration for unsaturated zone. If ust is true, the whole unsaturated store is available for transpiration.\n\nArguments\n\nrootingdepth\nustorelayerdepth\nsumlayer (depth (z) of upper boundary unsaturated layer)\nrestpotevap (remaining evaporation)\nsum_actevapustore (cumulative actual transpiration (more than one unsaturated layers))\nc (Brooks-Corey coefficient)\nusl (thickness of unsaturated zone)\nθₛ\nθᵣ\nhb (air entry pressure)\nust\n\nOutput\n\nustorelayerdepth\nsum_actevapustore\nrestpotevap\n\n\n\n\n\n","category":"function"},{"location":"#Wflow.add_time-Tuple{Any,Any}","page":"Home","title":"Wflow.add_time","text":"Add a new time to the unlimited time dimension, and return the index\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.close_files-Tuple{Any}","page":"Home","title":"Wflow.close_files","text":"Close input and output datasets that are opened on model initialization\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.csv_header-Tuple{Any,Any,Any}","page":"Home","title":"Wflow.csv_header","text":"Get a Vector{String} of all columns names for the CSV header, exept the first, time\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.detdrainlength-Tuple{Any,Any,Any}","page":"Home","title":"Wflow.detdrainlength","text":"detdrainlength(ldd, xl, yl)\n\nDetermines the drainaige length for a non square grid. Input ldd (drainage network), xl (length of cells in x direction), yl (length of cells in y direction). Output is drainage length.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.detdrainwidth-Tuple{Any,Any,Any}","page":"Home","title":"Wflow.detdrainwidth","text":"detdrainwidth(ldd, xl, yl)\n\nDetermines the drainaige width for a non square grid. Input ldd (drainage network), xl (length of cells in x direction), yl (length of cells in y direction). Output is drainage width.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.equal_size_vectors-Tuple{Any}","page":"Home","title":"Wflow.equal_size_vectors","text":"equal_size_vectors(x)\n\nUsed in the structs of arrays to ensure all vectors are of equal length.\n\nequal_size_vectors(([1,2], [1,2,3])) would throw an ArgumentError. equal_size_vectors(([4,5], [4,5])) would pass. equal_size_vectors((1, [4,5], [4,5])) would also pass, since 1 is not an AbstractVector.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.flat!-Tuple{Any,Any,Dict}","page":"Home","title":"Wflow.flat!","text":"Flatten a nested dictionary, keeping track of the full address of the keys. Useful for converting TOML of the format:\n\n[a.b]\nfield_of_b = \"name_in_output\"\n\n[a.d.c]\nfield_of_c = \"other_name_in_output\"\n\nto a non-nested format:\n\nDict(     symbols\"a.b.fieldofb\" => \"nameinoutput,     symbols\"a.d.c.fieldofc\" => \"othernamein_output, )\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.flowgraph-Tuple{AbstractArray{T,1} where T,AbstractArray{T,1} where T,AbstractArray{T,1} where T}","page":"Home","title":"Wflow.flowgraph","text":"Convert a gridded drainage direction to a directed graph\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.fraction_runoff_toriver-NTuple{5,Any}","page":"Home","title":"Wflow.fraction_runoff_toriver","text":"fraction_runoff_toriver(graph, ldd, index_river, slope, n)\n\nDetermine ratio frac between slope river cell index_river and slope of each upstream neighbor (based on directed acyclic graph graph).\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.get_at!-Tuple{Any,NCDatasets.CFVariable,AbstractArray{var\"#s13\",1} where var\"#s13\"<:Dates.TimeType,Dates.TimeType}","page":"Home","title":"Wflow.get_at!","text":"Extract a NetCDF variable at a given time\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.glacier_hbv-NTuple{8,Any}","page":"Home","title":"Wflow.glacier_hbv","text":"glacier_hbv(glacierfrac, glacierstore, snow, temperature, tt, cfmax, g_sifrac, Δt)\n\nHBV-light type of glacier modelling. First, a fraction of the snowpack is converted into ice using the HBV-light model (fraction between 0.001-0.005 per day). Glacier melting is modelled using a temperature degree factor and only occurs if the snow cover < 10 mm.\n\nArguments\n\nglacierFrac fraction covered by glaciers [-]\nglacierstore volume of the glacier [mm] w.e.\nsnow snow pack on top of glacier [mm]\ntemperature air temperature [°C]\ntt temperature threshold for ice melting [°C]\ncfmax ice degree-day factor in [mm/(°C/day)]\ng_sifrac fraction of the snow turned into ice [-]\nΔt model timestep [s]\n\nOutput\n\nsnow\nsnow2glacier\nglacierstore\nglaciermelt\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.infiltration-Tuple{Any,Any,Any,Any,Any,Any,Any,Bool,Bool}","page":"Home","title":"Wflow.infiltration","text":"infiltration(avail_forinfilt, pathfrac, cf_soil, tsoil, infiltcapsoil, infiltcappath, ustorecapacity, modelsnow::Bool, soilinfreduction::Bool)\n\nSoil infiltration based on infiltration capacity soil infiltcapsoil, infiltration capacity compacted area infiltcappath and capacity unsatured zone ustorecapacity. The soil infiltration capacity can be adjusted in case the soil is frozen (modelsnow and soilinfreduction is true).\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.initialize_hbv_model-Tuple{Wflow.Config}","page":"Home","title":"Wflow.initialize_hbv_model","text":"initialize_hbv_model(config::Config)\n\nInitial part of the SBM model concept. Reads the input settings and data as defined in the Config object. Will return a Model that is ready to run.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.initialize_sbm_model-Tuple{Wflow.Config}","page":"Home","title":"Wflow.initialize_sbm_model","text":"initialize_sbm_model(config::Config)\n\nInitial part of the SBM model concept. Reads the input settings and data as defined in the Config object. Will return a Model that is ready to run.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.initialize_storage-NTuple{4,Any}","page":"Home","title":"Wflow.initialize_storage","text":"Determine the initial storage depending on the storage function\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.kin_wave!-NTuple{9,Any}","page":"Home","title":"Wflow.kin_wave!","text":"Kinematic wave flow rate over the whole network for a single timestep\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.kinematic_wave-NTuple{7,Any}","page":"Home","title":"Wflow.kinematic_wave","text":"Kinematic wave flow rate for a single cell and timestep\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.kinematic_wave_ssf-NTuple{13,Any}","page":"Home","title":"Wflow.kinematic_wave_ssf","text":"Kinematic wave for lateral subsurface flow for a single cell and timestep\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.monthday_passed-Tuple{Any,Any}","page":"Home","title":"Wflow.monthday_passed","text":"monthday_passed(curr, avail)\n\nGiven two monthday tuples such as (12, 31) and (12, 15), return true if the first argument falls after or on the same day as the second argument, assuming the same year. The tuples generally come from Dates.monthday.\n\nExamples\n\njulia> monthday_passed((12, 31), (12, 15))\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.ncnames-Tuple{Any}","page":"Home","title":"Wflow.ncnames","text":"ncnames(dict)\n\nCreate a flat mapping from internal parameter locations to NetCDF variable names.\n\nIgnores top level values in the Dict. This function is used to convert a TOML such as:\n\n[output]\npath = \"path/to/file.nc\"\n\n[output.vertical]\ncanopystorage = \"my_canopystorage\"\n\n[output.lateral.river]\nq = \"my_q\"\n\nTo a dictionary of the flattened parameter locations and NetCDF names. The top level values are ignored since the output path is not a NetCDF name.\n\nDict(\n    (:vertical, :canopystorage) => \"my_canopystorage,\n    (:lateral, :river, :q) => \"my_q,\n)\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.ncread-Tuple{Any,Any}","page":"Home","title":"Wflow.ncread","text":"ncread(nc, var; <keyword arguments>)\n\nRead parameter var from NetCDF file nc. Supports various keyword arguments to get selections of data in desired types, with or without missing values.\n\nArguments\n\nkey=identity: key is a function which maps var to the name of the parameter in the       NetCDF file. The default identity keeps var as is.\nsel=nothing: a selection of indices, such as a Vector{CartesianIndex} of active cells,       to return from the NetCDF. By default all cells are returned.\ndefaults=nothing: a dictionary in which default values are looked up if var is not       in nc. By default it gives an error in this case.\ntype=nothing: type to convert data to after reading. By default no conversion is done.\nallow_missing=false: Missing values within sel is not allowed by default. Set to       true to allow missing values.\nfill=nothing: Missing values are replaced by this fill value if allow_missing is false.\ndimname : name of third dimension of parameter var. By default no third dimension is expected.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.out_map-Tuple{Any,Any}","page":"Home","title":"Wflow.out_map","text":"out_map(ncnames_dict, modelmap)\n\nCreate a Dict that maps parameter NetCDF names to arrays in the Model.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.param-Tuple{Any,Any}","page":"Home","title":"Wflow.param","text":"Get a nested field using a tuple of Symbols\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.pow-Tuple{Any,Any}","page":"Home","title":"Wflow.pow","text":"Faster method for exponentiation\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.rainfall_interception_gash-NTuple{5,Any}","page":"Home","title":"Wflow.rainfall_interception_gash","text":"rainfall_interception_gash(cmax, e_r, canopygapfraction, precipitation, canopystorage;maxevap = 9999.0)\n\nInterception according to the Gash model (for daily timesteps). cmax is the maximum canopy storage and e_r is the ratio of the average evaporation from the wet canopy and the average precipitation intensity on a saturated canopy.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.rainfall_interception_modrut-NTuple{5,Any}","page":"Home","title":"Wflow.rainfall_interception_modrut","text":"rainfall_interception_modrut(precipitation, potential_evaporation, canopystorage, canopygapfraction, cmax)\n\nInterception according to a modified Rutter model. The model is solved explicitly and there is no drainage below cmax.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.reducer-NTuple{7,Any}","page":"Home","title":"Wflow.reducer","text":"Get a reducer function based on CSV output settings defined in a dictionary\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.reducerfunction-Tuple{AbstractString}","page":"Home","title":"Wflow.reducerfunction","text":"Mapping from reducer strings in the TOML to functions\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.run_simulation-Tuple{Any}","page":"Home","title":"Wflow.run_simulation","text":"run_simulation(tomlpath::String)\nrun_simulation(config::Config)\nrun_simulation(model::Model)\n\nRun an entire simulation starting either from a path to a TOML settings file, a prepared Config object, or an initialized Model object. This allows more flexibility if you want to for example modify a Config before initializing the Model.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.scurve-Tuple{Any}","page":"Home","title":"Wflow.scurve","text":"scurve(x; a = 0.0, b = 1.0, c = 1.0)\n\nSigmoid \"S\"-shaped curve.\n\nArguments\n\nx::Real: input\na::Real: determines the centre level (default = 0.0)\nb::Real: determines the amplitude of the curve\nc::Real: determines the steepness or \"stepwiseness\" of the curve.            The higher c the sharper the function. A negative c reverses the function.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.set_layerthickness-Tuple{Float64,StaticArrays.SArray{Tuple{S},T,1,S} where T where S,StaticArrays.SArray{Tuple{S},T,1,S} where T where S}","page":"Home","title":"Wflow.set_layerthickness","text":"set_layerthickness(d::Float64, sl::SVector)\n\nCalculate actual soil thickness of layers based on a reference depth (e.g. soil depth or water table depth) d, a SVector sl with cumulative soil depth starting at soil surface (0), and a SVector tl with actual thickness per soil layer.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.set_states-Tuple{Any,Any,Any}","page":"Home","title":"Wflow.set_states","text":"set_states(instate_path, model, state_ncnames; <keyword arguments>)\n\nRead states contained in Dict state_ncnames from NetCDF file located in instate_path, and set states in model object. Active cells are selected with the corresponding network's (Vector{CartesianIndex}) from the NetCDF file. \n\nArguments\n\ntype = nothing: type to convert data to after reading. By default no conversion is done.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.setup_netcdf-NTuple{7,Any}","page":"Home","title":"Wflow.setup_netcdf","text":"prepare an output dataset\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.snowpack_hbv-NTuple{9,Any}","page":"Home","title":"Wflow.snowpack_hbv","text":"snowpack_hbv(snow, snowwater, precipitation, temperature, tti, tt, ttm, cfmax, whc)\n\nHBV type snowpack modeling using a temperature degree factor. All correction factors (RFCF and SFCF) are set to 1. The refreezing efficiency factor is set to 0.05.\n\nArguments\n\nsnow (snow storage)\nsnowwater (liquid water content in the snow pack)\nprecipitation (throughfall + stemflow)\ntemperature\ntti (snowfall threshold interval length)\ntt (threshold temperature for snowfall)\nttm (melting threshold)\ncfmax (degree day factor, rate of snowmelt)\nwhc (Water holding capacity of snow)\nrfcf correction factor for rainfall\nsfcf correction factor for snowfall\ncfr refreeing efficiency constant in refreezing of freewater in snow\n\nOutput\n\nsnow\nsnowwater\nsnowmelt\nrainfall (precipitation that occurs as rainfall)\nsnowfall (precipitation that occurs as snowfall)\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.statevars","page":"Home","title":"Wflow.statevars","text":"statevars(::SBM; snow=false)\nstatevars(::LateralSSF)\nstatevars(::SurfaceFlow)\nstatevars(::NaturalLake)\nstatevars(::SimpleReservoir)\n\nGet a tuple of symbols representing the fields that are model states.\n\n\n\n\n\n","category":"function"},{"location":"#Wflow.sum_at-Tuple{Any,Any}","page":"Home","title":"Wflow.sum_at","text":"Return the sum of the array A at indices inds\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.symbols-Tuple{Any}","page":"Home","title":"Wflow.symbols","text":"Turn \"a.aa.aaa\" into (:a, :aa, :aaa)\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.timecycles-Tuple{Any}","page":"Home","title":"Wflow.timecycles","text":"timecycles(times)\n\nGiven a vector of times, return a tuple of (month, day) for each time entry, to use as a cyclic time series that repeats every year. By using monthday rather than dayofyear, leap year offsets are avoided.\n\nIt can generate such a series from eiher TimeTypes given that the year is constant, or it will interpret integers as either months or days of year if possible.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.tosecond-Tuple{Dates.Hour}","page":"Home","title":"Wflow.tosecond","text":"tosecond(x::Period)\n\nConvert a Period into a Float64, which represents the number of seconds. Will fail if this is not well defined, such as for Month.\n\nExamples\n\njulia> tosecond(Day(1))\n86400.0\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.unsatzone_flow_layer-NTuple{4,Any}","page":"Home","title":"Wflow.unsatzone_flow_layer","text":"unsatzone_flow_layer(usd, kv_z, l_sat, c)\n\nAssuming a unit head gradient, the transfer of water from an unsaturated store layer usd is controlled by the vertical saturated hydraulic conductivity kv_z (bottom layer or water table), the effective saturation degree of the layer (ratio usd and l_sat), and a Brooks-Corey power coefficient c.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.unsatzone_flow_sbm-NTuple{7,Any}","page":"Home","title":"Wflow.unsatzone_flow_sbm","text":"unsatzone_flow_sbm(ustorelayerdepth, soilwatercapacity, satwaterdepth, kv_z, usl, θₛ, θᵣ)\n\nThe transfer of water from the unsaturated store ustorelayerdepth to the saturated store satwaterdepth is controlled by the vertical saturated hydraulic conductivity kv_z at the water table and the ratio between ustorelayerdepth and the saturation deficit (soilwatercapacity minus satwaterdepth). This is the original Topog_SBM vertical transfer formulation.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.update-Tuple{Wflow.NaturalLake,Any,Any,Any,Any}","page":"Home","title":"Wflow.update","text":"Update a single lake at position i.\n\nThis is called from within the kinematic wave loop, therefore updating only for a single element rather than all at once.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.update-Tuple{Wflow.SimpleReservoir,Any,Any,Any}","page":"Home","title":"Wflow.update","text":"Update a single reservoir at position i.\n\nThis is called from within the kinematic wave loop, therefore updating only for a single element rather than all at once.\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.update-Union{Tuple{Wflow.Model{N,L,V,R,W}}, Tuple{W}, Tuple{R}, Tuple{V}, Tuple{L}, Tuple{N}} where W where R where V<:Wflow.SBM where L where N","page":"Home","title":"Wflow.update","text":"update SBM model for a single timestep\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.update_cyclic!-Tuple{Any}","page":"Home","title":"Wflow.update_cyclic!","text":"Get cyclic NetCDF input for the given time\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.update_forcing!-Tuple{Any}","page":"Home","title":"Wflow.update_forcing!","text":"Get dynamic NetCDF input for the given time\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.write_netcdf_timestep-Tuple{Any,Any,Any}","page":"Home","title":"Wflow.write_netcdf_timestep","text":"Write a new timestep to the NetCDF file\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.write_output-Tuple{Any}","page":"Home","title":"Wflow.write_output","text":"Write model output\n\n\n\n\n\n","category":"method"},{"location":"#Wflow.@symbols_str-Tuple{Any}","page":"Home","title":"Wflow.@symbols_str","text":"Turn symbols\"a.aa.aaa\" into (:a, :aa, :aaa)\n\n\n\n\n\n","category":"macro"}]
}
