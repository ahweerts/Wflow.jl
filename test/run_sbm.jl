using BenchmarkTools, Juno

function update(model, toposort, n)
    @unpack lateral, vertical, network, clock = model

    # update the vertical
    for i in eachindex(vertical)
        vertical[i] = Wflow.update_before_lateralflow(vertical[i])
        lateral.recharge[i] = vertical[i].recharge  * lateral.dl[i]
        lateral.zi[i] = vertical[i].zi
    end

    Wflow.update(lateral, network, toposort, n)

    for i in eachindex(vertical)
        vertical[i] = Wflow.update_after_lateralflow(vertical[i], lateral.zi[i], lateral.exfiltwater[i])
    end
    # update the clock
    clock.iteration += 1
    clock.time += clock.Δt

    return model
end

model = Wflow.initialize_sbm_model(staticmaps_moselle_path, leafarea_moselle_path)
toposort = Wflow.topological_sort_by_dfs(model.network)
n = length(toposort)
model = update(model, toposort, n)
@test model.clock.iteration == 2
sbm = model.vertical[1]
@test sbm.altitude == 345.1470031738281
@test sbm.θₛ == 0.46367356181144714
@test isnan(sbm.runoff)  # should probably be initialized to 0.0
@test sbm.soilevap == 0.08821308159314034
# run the second timestep
model = update(model, toposort, n)
sbm = model.vertical[1]
@test sbm.altitude == 345.1470031738281
@test sbm.θₛ == 0.46367356181144714
@test isnan(sbm.runoff)
@test sbm.soilevap == 0.17235604508244792


@time update(model, toposort, n)
@btime update(model, toposort, n)
@profiler foreach(x -> update(model, toposort, n), 1:10)  # run a few times for more accuracy

