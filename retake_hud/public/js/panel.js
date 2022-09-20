var io = io('http://' + ip + ':' + port + '/');

function loadMatch(data) {
    loadTeams((teams) => {
        $teamList = $("#team_1, #team_2");
        $teamList.html("<option value=null>NONE</option><option value='auto' selected>Try to match team automatically</option>");

        teams.forEach(function(team, id) {
            let $option = $("<option value='" + team._id + "'>" + team.team_name + " (" + team.short_name + ")</option>");
            if (team.logo) {
                $option.attr("data-icon", "/teams/" + team.logo)
            }
            $teamList.append($option);
        }, this);
        if (data) {
            $("#botype").val(data.match);
            $("#team_1_score").val("0").val(data.team_1.map_score);
            $("#team_2_score").val("0").val(data.team_2.map_score);
            $("#team_1").val("auto").val(data.team_1.team);
            $("#team_2").val("auto").val(data.team_2.team);
            $("#map_pick_1").val("auto").val(data.map_pick.map1);
            $("#map_pick_2").val("auto").val(data.map_pick.map2);
            $("#map_pick_3").val("auto").val(data.map_pick.map3);
            $("#map_playing").val("auto").val(data.map_pick.map_current);
            $("#swapsides").val("auto").val(data.map_pick.sides_swap);
            $("#map_1_right_result").val("auto").val(data.map_1_res.map_right_res);
            $("#map_1_left_result").val("auto").val(data.map_1_res.map_left_res);
            $("#map_2_right_result").val("auto").val(data.map_2_res.map_right_res);
            $("#map_2_left_result").val("auto").val(data.map_2_res.map_left_res);
            $("#map_3_right_result").val("auto").val(data.map_3_res.map_right_res);
            $("#map_3_left_result").val("auto").val(data.map_3_res.map_left_res);
        }
        $("select").formSelect();

    });
}
$(document).ready(() => {
    $("#set").click(() => {
        let match = {
            match: $("#botype").val(),
            team_1: {
                map_score: $("#team_1_score").val(),
                team: $("#team_1").val()
            },
            team_2: {
                map_score: $("#team_2_score").val(),
                team: $("#team_2").val()
            },
            map_pick: {
                map1: $("#map_pick_1").val(),
                map2: $("#map_pick_2").val(),
                map3: $("#map_pick_3").val(),
                map_current: $("#map_playing").val(),
                sides_swap: $("#swapsides").val()
            },
            map_1_res: {
                map_right_res: $("#map_1_right_result").val(),
                map_left_res: $("#map_1_left_result").val()
            },
            map_2_res: {
                map_right_res: $("#map_2_right_result").val(),
                map_left_res: $("#map_2_left_result").val()
            },
            map_3_res: {
                map_right_res: $("#map_3_right_result").val(),
                map_left_res: $("#map_3_left_result").val(),
            }
        };
        io.emit("update_match", match);
    });
    $("#swap").click(() => {
        let match = {
            match: $("#botype").val(),
            team_2: {
                map_score: $("#team_1_score").val(),
                team: $("#team_1").val()
            },
            team_1: {
                map_score: $("#team_2_score").val(),
                team: $("#team_2").val()
            },
            map_pick: {
                map1: $("#map_pick_1").val(),
                map2: $("#map_pick_2").val(),
                map3: $("#map_pick_3").val(),
                map_current: $("#map_playing").val(),
                sides_swap: $("#swapsides").val(),
            },
            map_1_res: {
                map_right_res: $("#map_1_left_result").val(),
                map_left_res: $("#map_1_right_result").val()
            },
            map_2_res: {
                map_right_res: $("#map_2_left_result").val(),
                map_left_res: $("#map_2_right_result").val()
            },
            map_3_res: {
                map_right_res: $("#map_3_left_result").val(),
                map_left_res: $("#map_3_right_result").val()
            }
        };
        io.emit("update_match", match);
    });

    $("#ref").click(() => {
        io.emit("refresh", true);
    });
    io.on('match', loadMatch);
    loadMatch();
    io.emit("ready", true);

});