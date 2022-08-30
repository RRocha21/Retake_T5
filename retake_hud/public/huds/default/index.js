var teams = {
    left: {},
    right: {}
}

var ticker_text = "ASDASDSDA";

var start_money = {};
var wl_teama = "";
var wl_teamb = "";



var map1 = "vertigo"; // Map 1 Name
var map2 = "dust2"; // Map 2 Name
var map3 = "inferno"; // Map 3 Name
var map4 = ""; // Map 4 Name
var map5 = ""; // Map 5 Name
var playing = "3" // Values: 1-5
var pick = "DECIDER"; // Current map pick

var swappicksides = 0;

var map1_res1 = 16;
var map1_res2 = 14;

var map2_res1 = 16;
var map2_res2 = 2;

var map3_res1 = 11;
var map3_res2 = 1;

var bo = 1;

var flag_replays = 1;

var t_color = "255, 77, 64";
var ct_color = "99, 64, 243";

var dark_ct_color = "44, 43, 48";
var dark_t_color = "44, 43, 48";

var black_color = "44, 43, 48";
var white_color = "236, 236, 236";

var warning = "229, 16, 27";


/* -------------------------------- */
var count = 1;
numtext = 0;
var txt = ["../../files/img/hud_elements/logo_prodigies.png", "../../files/img/hud_elements/logo_pew.png"];
var txt_sponsor = ["../../files/img/hud_elements/SLIDE_1.png", "../../files/img/hud_elements/SLIDE_2.png"];
var count = 1;
$(document).ready(
    function() {
        setInterval(function() {
            if (numtext >= 1) {
                numtext = 0;
            } else {
                numtext = numtext + 1;
            }
            $(".topbar_container > .topbar_i_logo > .inner").fadeOut(function() {
                $(this).html("<img src='" + txt[numtext] + "'></img>")

            }).fadeIn();
            $(".sponsor>.inner").fadeOut(function() {
                $(this).html("<img src='" + txt_sponsor[numtext] + "'></img>")
            }).fadeIn();
        }, 15000);
    });

/******************************** */

/*
if (pick !== "") {
    if (pick == "DECIDER") {

    } else {
        var pick = pick + " PICK";
    }
}

if (map4 == "" && map5 == "") {

    if (playing == 1) {
        var maps = "<font color='#EB4802'>" + map1 + "</font>&nbsp;&nbsp;&nbsp;&nbsp;" + map2 + "&nbsp;&nbsp;&nbsp;&nbsp;" + map3;
    } else if (playing == 2) {
        var maps = "<font style='opacity: 0.3;'>" + map1 + "</font>&nbsp;&nbsp;&nbsp;&nbsp;<font color='#EB4802'>" + map2 + "</font>&nbsp;&nbsp;&nbsp;&nbsp;" + map3;
    } else if (playing == 3) {
        var maps = "<font style='opacity: 0.3;'>" + map1 + "</font>&nbsp;&nbsp;&nbsp;&nbsp;<font style='opacity: 0.3;'>" + map2 + "</font>&nbsp;&nbsp;&nbsp;&nbsp;<font color='#EB4802'>" + map3 + "</font>";
    }

}


if (!(map4 == "" && map5 == "")) {

    if (playing == 1) {
        var maps = "<font color='#EB4802'>" + map1 + "</font>&nbsp;&nbsp;" + map2 + "&nbsp;&nbsp;" + map3 + "&nbsp;&nbsp;" + map4 + "&nbsp;&nbsp;" + map5;
    } else if (playing == 2) {
        var maps = "<font style='opacity: 0.3;'>" + map1 + "</font>&nbsp;&nbsp;<font color='#EB4802'>" + map2 + "</font>&nbsp;&nbsp;" + map3 + "&nbsp;&nbsp;" + map4 + "&nbsp;&nbsp;" + map5;
    } else if (playing == 3) {
        var maps = "<font style='opacity: 0.3;'>" + map1 + "</font>&nbsp;&nbsp;<font style='opacity: 0.3;'>" + map2 + "</font>&nbsp;&nbsp;<font color='#EB4802'>" + map3 + "</font>&nbsp;&nbsp;" + map4 + "&nbsp;&nbsp;" + map5;
    } else if (playing == 4) {
        var maps = "<font style='opacity: 0.3;'>" + map1 + "</font>&nbsp;&nbsp;<font style='opacity: 0.3;'>" + map2 + "</font>&nbsp;&nbsp;<font style='opacity: 0.3;'>" + map3 + "</font>&nbsp;&nbsp;<font color='#EB4802'>" + map4 + "</font>&nbsp;&nbsp;" + map5;
    } else if (playing == 5) {
        var maps = "<font style='opacity: 0.3;'>" + map1 + "</font>&nbsp;&nbsp;<font style='opacity: 0.3;'>" + map2 + "</font>&nbsp;&nbsp;<font style='opacity: 0.3;'>" + map3 + "</font>&nbsp;&nbsp;<font style='opacity: 0.3;'>" + map4 + "</font>&nbsp;&nbsp;<font color='#EB4802'>" + map5 + "</font>";
    }

}
*/

function fillObserved(player) {
    let statistics = player.getStats();
    let weapons = player.weapons;
    let right = false;
    let pslot;
    let sideactive;



    if (player.observer_slot >= 1 && player.observer_slot <= 5) {
        $sideactive = "left";
    } else {
        $sideactive = "right";
    }

    if (player.observer_slot >= 1 && player.observer_slot <= 5)
        pslot = player.observer_slot;
    else {
        pslot = player.observer_slot - 5;
    }

    let $playeractive = $(".players_" + $sideactive + "_container").find("#Player" + pslot);

    obs_player_name = player.name;
    if (obs_player_name.length > 13) obs_player_name = obs_player_name.substring(0, 13);
    $(".Spectate_Container>.Spectate_Bar>.Name_Spectate").html(obs_player_name);

    $(".Spectate_Container>.Spectate_Bar>#utility").html("");

    $playeractive.find(".separator").css("opacity", "1");

    if (player.team == "CT" && teams.left.side == "ct") {
        $(".Spectate_Container>.Spectate_Bar").css("background-image", "url(../../files/img/hud_elements/Texture_Fluid_CT.png)")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate_Background").css("background-color", "rgba(" + ct_color + ",0.2)");
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate").css("background-color", "rgb(" + ct_color + ")");

        $(".Spectate_Container > .Spectate_Bar > .Health_Spectate_BG > .Health_Spectate").html("" + statistics.health + "")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate").css("width", ((97 * statistics.health) / 100) + "%");
        if (statistics.defusekit) {
            $(".Spectate_Container>.Spectate_Bar>.defuse>.defuse_icon").css("opacity", "1");
        } else {
            $(".Spectate_Container>.Spectate_Bar>.defuse>.defuse_icon").css("opacity", "0");
        }
        if (statistics.armor) {
            $(".Spectate_Container>.Spectate_Bar>.shield>.shield_icon").css("opacity", "1");
        }
        if (statistics.armor && statistics.helmet) {
            $(".Spectate_Container>.Spectate_Bar>.helmet>.helmet_icon").css("opacity", "1");
        }
        $(".Spectate_Container>.Spectate_Bar>.Ammo_Spectate_BG>.Ammo_Bar_Spectate_Background").css("background-color", "rgba(" + ct_color + ",0.2)");


    } else if (player.team == "CT" && teams.right.side == "ct") {
        $(".Spectate_Container>.Spectate_Bar").css("background-image", "url(../../files/img/hud_elements/Texture_Fluid_CT.png)")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate_Background").css("background-color", "rgb(" + ct_color + ",0.2)");
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate ").css("background-color", "rgb(" + ct_color + ")");


        $(".Spectate_Container > .Spectate_Bar > .Health_Spectate_BG > .Health_Spectate").html("" + statistics.health + "")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate").css("width", ((97 * statistics.health) / 100) + "%");
        if (statistics.defusekit) {
            $(".Spectate_Container>.Spectate_Bar>.defuse>.defuse_icon").css("opacity", "1");
        } else {
            $(".Spectate_Container>.Spectate_Bar>.defuse>.defuse_icon").css("opacity", "0");
        }
        if (statistics.armor) {
            $(".Spectate_Container>.Spectate_Bar>.shield>.shield_icon").css("opacity", "1");
        }
        if (statistics.armor && statistics.helmet) {
            $(".Spectate_Container>.Spectate_Bar>.helmet>.helmet_icon").css("opacity", "1");
        }
        $(".Spectate_Container>.Spectate_Bar>.Ammo_Spectate_BG>.Ammo_Bar_Spectate_Background").css("background-color", "rgb(" + ct_color + ",0.2)");


    } else if (player.team == "T" && teams.left.side == "t") {
        $(".Spectate_Container>.Spectate_Bar").css("background-image", "url(../../files/img/hud_elements/Texture_Fluid_T.png)")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate_Background").css("background-color", "rgba(" + t_color + ",0.2)");
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate").css("background-color", "rgb(" + t_color + ")");

        $(".Spectate_Container > .Spectate_Bar > .Health_Spectate_BG > .Health_Spectate").html("" + statistics.health + "")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate").css("width", ((97 * statistics.health) / 100) + "%");
        if (statistics.defusekit) {
            $(".Spectate_Container>.Spectate_Bar>.defuse>.defuse_icon").css("opacity", "1");
        } else {
            $(".Spectate_Container>.Spectate_Bar>.defuse>.defuse_icon").css("opacity", "0");
        }
        if (statistics.armor) {
            $(".Spectate_Container>.Spectate_Bar>.shield>.shield_icon").css("opacity", "1");
        }
        if (statistics.armor && statistics.helmet) {
            $(".Spectate_Container>.Spectate_Bar>.helmet>.helmet_icon").css("opacity", "1");
        }
        $(".Spectate_Container>.Spectate_Bar>.Ammo_Spectate_BG>.Ammo_Bar_Spectate_Background").css("background-color", "rgba(" + t_color + ",0.2)");


    } else if (player.team == "T" && teams.right.side == "t") {
        $(".Spectate_Container>.Spectate_Bar").css("background-image", "url(../../files/img/hud_elements/Texture_Fluid_T.png)")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate_Background").css("background-color", "rgba(" + t_color + ",0.2)");
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate ").css("background-color", "rgb(" + t_color + ")");

        $(".Spectate_Container > .Spectate_Bar > .Health_Spectate_BG > .Health_Spectate").html("" + statistics.health + "")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate").css("width", ((97 * statistics.health) / 100) + "%");
        if (statistics.defusekit) {
            $(".Spectate_Container>.Spectate_Bar>.defuse>.defuse_icon").css("opacity", "1");
        } else {
            $(".Spectate_Container>.Spectate_Bar>.defuse>.defuse_icon").css("opacity", "0");
        }
        if (statistics.armor) {
            $(".Spectate_Container>.Spectate_Bar>.shield>.shield_icon").css("opacity", "1");
        }
        if (statistics.armor && statistics.helmet) {
            $(".Spectate_Container>.Spectate_Bar>.helmet>.helmet_icon").css("opacity", "1");
        }
        $(".Spectate_Container>.Spectate_Bar>.Ammo_Spectate_BG>.Ammo_Bar_Spectate_Background").css("background-color", "rgba(" + t_color + ",0.2)");

    }

    $(".Spectate_Container>.Spectate_Bar>#utility").html("");

    for (let key in weapons) {
        let weapon = weapons[key];
        if (weapon.type == "Grenade") {
            for (let x = 0; x < weapon.ammo_reserve; x++) {
                if (weapon.name == "weapon_flashbang" || weapon.name == "weapon_decoy") {
                    $(".Spectate_Container>.Spectate_Bar>#utility").append($("<img style='margin-right: 8px '/>").attr("src", "/files/img/grenades/" + weapon.name + ".png"));
                } else {
                    $(".Spectate_Container>.Spectate_Bar>#utility").append($("<img />").attr("src", "/files/img/grenades/" + weapon.name + ".png"));
                }
            }
        }
        if (weapon.state == "active" || weapon.state == "reloading") {
            if (weapon.type == "Grenade" || weapon.type == "C4" || weapon.type == "Knife" || statistics.health == 0) {
                $(".Spectate_Container>.Spectate_Bar>.Ammo_Spectate_BG>.Ammo_Spectate").html("");
            } else {
                $(".Spectate_Container>.Spectate_Bar>.Ammo_Spectate_BG>.Ammo_Spectate").html(weapon.ammo_clip + "/" + weapon.ammo_reserve + "");
            }
            if (weapon.type == "C4") {
                // fazer aqui para aparecer a bomba no observer container
            }
        }
    }

    loadAvatar(player.steamid, function() {
        $(".picture").html($("<img width='130px' height='130px'  />").attr("src", "/av/" + player.steamid));
    });

}





let l_alive = 0;
let r_alive = 0;


let l_grenade = 0;
let l_smoke = 0;
let l_molo = 0;
let l_flash = 0;

let pl = 0;
let pl_grenade = 0;
let pl_smoke = 0;
let pl_molo = 0;
let pl_flash = 0;

let r_grenade = 0;
let r_smoke = 0;
let r_molo = 0;
let r_flash = 0;

let pr = 0;
let pr_grenade = 0;
let pr_smoke = 0;
let pr_molo = 0;
let pr_flash = 0;

let l_team_value = 0;
let r_team_value = 0;

var left_team_value = 0;
var right_team_value = 0;

function fillPlayers(teams) {
    if (teams.left.players) {
        for (var i = 0; i < 5; i++) {
            if (i >= teams.left.players.length) {
                $("#left").find("#player" + (i + 1)).css("opacity", "0");
            } else {
                fillPlayer(teams.left.players[i], i, "left", teams.left.players.length);
                fillGrenadeLeft(teams.left.players[i], i, "left", teams.left.players.length);
                $("#left").find("#player" + (i + 1)).css("opacity", "1");
                $(".player_count_left").html(l_alive);
            }

            if (i == 4) {
                l_grenade = 0;
                l_smoke = 0;
                l_molo = 0;
                l_flash = 0;
                pl = 0;
                pl_grenade = 0;
                pl_smoke = 0;
                pl_molo = 0;
                pl_flash = 0;

                l_alive = 0;
                left_team_value = l_team_value;
                l_team_value = 0;
            }
        }
    }
    if (teams.right.players) {
        for (var i = 0; i < 5; i++) {
            if (i >= teams.right.players.length) {
                $("#right").find("#player" + (i + 1)).css("opacity", "0");
            } else {
                fillPlayer(teams.right.players[i], i, "right", teams.right.players.length);
                fillGrenadeRight(teams.right.players[i], i, "right", teams.left.players.length);
                $("#right").find("#player" + (i + 1)).css("opacity", "1");
                $(".player_count_right").html(r_alive);
            }
            if (i == 4) {
                r_grenade = 0;
                r_smoke = 0;
                r_molo = 0;
                r_flash = 0;
                pr = 0;
                pr_grenade = 0;
                pr_smoke = 0;
                pr_molo = 0;
                pr_flash = 0;
                right_team_value = r_team_value;
                r_team_value = 0;
                r_alive = 0;

            }
        }
    }
}




function fillGrenadeLeft(player, nr, side, max) {
    let slot = player.observer_slot;
    let statistics = player.getStats();
    let weapons = player.getWeapons();
    let steamid = player.steamid;

    if (statistics.health !== 0) {
        l_alive = l_alive + 1;
    }



    for (let key in weapons) {
        let weapon = weapons[key];
        let name = weapon.name.replace("weapon_", "");
        let state = weapon.state;
        let view = "";
        let type = weapon.type;

        if (type == "Grenade") {
            for (let x = 0; x < weapon.ammo_reserve; x++) {

                if (name == "hegrenade") {
                    l_grenade++;
                    pl_grenade = pl_grenade + 1;
                }

                if (name == "incgrenade" || name == "molotov") {
                    l_molo++;
                    pl_molo = pl_molo + 2;
                }

                if (name == "flashbang") {
                    l_flash++;
                    pl_flash = pl_flash + 3;
                }

                if (name == "smokegrenade") {
                    l_smoke++;
                    pl_smoke = pl_smoke + 4;
                }

            }

        }

        pl = pl_smoke + pl_flash + pl_molo + pl_grenade;

        if (pl == 0) {
            $(".spam > .left_container > .classification").html("NULL");
            $(".spam > .left_container > .classification").css("color", "#ed0000");
        } else if (pl >= 1 && pl <= 20) {
            $(".spam > .left_container > .classification").html("POOR");
            $(".spam > .left_container > .classification").css("color", "#EB4802");
        } else if (pl >= 21 && pl <= 30) {
            $(".spam > .left_container > .classification").html("BASIC");
            $(".spam > .left_container > .classification").css("color", "rgb(255, 19, 31)");
        } else if (pl >= 31 && pl <= 40) {
            $(".spam > .left_container > .classification").html("GOOD");
            $(".spam > .left_container > .classification").css("color", "rgb(48, 140, 244)");
        } else if (pl >= 41) {
            $(".spam > .left_container > .classification").html("FINE");
            $(".spam > .left_container > .classification").css("color", "rgb(75 255 0)");
        }

        $(".spam > .left_container > .he_container > .count").html("x" + l_grenade);
        $(".spam > .left_container > .smoke_container > .count").html("x" + l_smoke);
        $(".spam > .left_container > .molo_container > .count").html("x" + l_molo);
        $(".spam > .left_container > .flash_container > .count").html("x" + l_flash);


    }

}

function fillGrenadeRight(player, nr, side, max) {
    let slot = player.observer_slot;
    let statistics = player.getStats();
    let weapons = player.getWeapons();
    let steamid = player.steamid;

    if (statistics.health !== 0) {
        r_alive = r_alive + 1;
    }

    for (let key in weapons) {
        let weapon = weapons[key];
        let name = weapon.name.replace("weapon_", "");
        let state = weapon.state;
        let view = "";
        let type = weapon.type;

        if (type == "Grenade") {
            for (let x = 0; x < weapon.ammo_reserve; x++) {

                if (name == "hegrenade") {
                    r_grenade++;
                    pr_grenade = pr_grenade + 1;
                }

                if (name == "incgrenade" || name == "molotov") {
                    r_molo++;
                    pr_molo = pr_molo + 2;
                }

                if (name == "flashbang") {
                    r_flash++;
                    pr_flash = pr_flash + 3;
                }

                if (name == "smokegrenade") {
                    r_smoke++;
                    pr_smoke = pr_smoke + 4;
                }

            }

        }


        pr = pr_smoke + pr_flash + pr_molo + pr_grenade;

        if (pr == 0) {
            $(".spam > .right_container > .classification").html("NULL");
            $(".spam > .right_container > .classification").css("color", "#ed0000");
        } else if (pr >= 1 && pr <= 20) {
            $(".spam > .right_container > .classification").html("POOR");
            $(".spam > .right_container > .classification").css("color", "#EB4802");
        } else if (pr >= 21 && pr <= 30) {
            $(".spam > .right_container > .classification").html("BASIC");
            $(".spam > .right_container > .classification").css("color", "rgb(255, 19, 31)");
        } else if (pr >= 31 && pr <= 40) {
            $(".spam > .right_container > .classification").html("GOOD");
            $(".spam > .right_container > .classification").css("color", "rgb(48, 140, 244)");
        } else if (pr >= 41) {
            $(".spam > .right_container > .classification").html("FINE");
            $(".spam > .right_container > .classification").css("color", "rgb(75 255 0)");
        }

        $(".spam > .right_container > .he_container > .count").html("x" + r_grenade);
        $(".spam > .right_container > .smoke_container > .count").html("x" + r_smoke);
        $(".spam > .right_container > .molo_container > .count").html("x" + r_molo);
        $(".spam > .right_container > .flash_container > .count").html("x" + r_flash);


    }

}



function fillPlayer(player, nr, side, max) {


    let slot = player.observer_slot;
    let statistics = player.getStats();
    let weapons = player.getWeapons();
    let steamid = player.steamid;

    let team = player.team.toLowerCase();

    let health_color;

    let $player = $(".players_" + side + "_container").find("#Player" + (nr + 1));


    $player.find(".separator").css("opacity", "0");

    if (side == "right") {
        if (team == "ct") {
            $(".right_series").find(".block").css("border-color", "rgba(" + dark_ct_color + " ,1)");
            $(".right_series").find(".win").css("background", "rgba(" + ct_color + " ,1)");
            $(".right_series").find(".win").css("box-shadow", "rgba(" + dark_ct_color + ",1) 0px 0px 15px 3px");
            $(".players_right_container>.player_container").css("background-image", "url(../../files/img/hud_elements/back.png)");
        } else {
            $(".right_series").find(".block").css("border-color", "rgba(" + dark_t_color + ",1)");
            $(".right_series").find(".win").css("background", "rgba(" + t_color + ",1)");
            $(".right_series").find(".win").css("box-shadow", "rgba(" + dark_t_color + ",1) 0px 0px 15px 3px");
            $(".players_right_container>.player_container").css("background-image", "url(../../files/img/hud_elements/back.png)");
        }
    }

    if (side == "left") {
        if (team == "ct") {
            health_color = "linear-gradient(90deg, rgba(" + ct_color + ", 0.3) 0px, rgba(" + ct_color + ", 0.85) 143px, rgba(" + ct_color + ", 1) 330px)";
            $(".left_series").find(".block").css("border-color", "rgba(" + dark_ct_color + " ,1)");
            $(".left_series").find(".win").css("background", "rgba(" + ct_color + ", 1)");
            $(".left_series").find(".win").css("box-shadow", "rgba(" + dark_ct_color + ", 1) 0px 0px 15px 3px");
            $(".players_left_container>.player_container").css("background-image", "url(../../files/img/hud_elements/back.png)");
        } else {
            health_color = "linear-gradient(90deg, rgba(" + t_color + ", 0.3) 0px, rgba(" + t_color + ", 0.9) 143px, rgba(" + t_color + ", 1) 330px)";
            $(".left_series").find(".block").css("border-color", "rgba(" + dark_t_color + ",1)");
            $(".left_series").find(".win").css("background", "rgba(" + t_color + ",1)");
            $(".left_series").find(".win").css("box-shadow", "rgba(" + dark_t_color + ",1) 0px 0px 15px 3px");
            $(".players_left_container>.player_container").css("background-image", "url(../../files/img/hud_elements/back.png)");
        }
    }

    //PLAYER KILLS AND DEATHS
    /*
    if (statistics.round_kills > 0) {
        $bottom.find(".k").html(statistics.kills + "<sup> (" + statistics.round_kills + ")</sup>");
    } else {
        $bottom.find(".k").html(statistics.kills);
    }
    */

    $player.find(".Kills").html(statistics.kills);
    $player.find(".Deaths").html(statistics.deaths);


    //OBSERVED

    $player.find(".separator").removeClass("observed");
    $player.find(".number").removeClass("observed");

    /*################################################# CHANGING WHEN A PLAYERS DIES #################################################### */

    $player.removeClass("dead").addClass("alive").removeClass(statistics.health == 0 ? "alive" : "").addClass(statistics.health == 0 ? "dead" : "");
    $player.find(".health_text").removeClass("dead_life").addClass("alive_life").removeClass(statistics.health == 0 ? "alive_life" : "").addClass(statistics.health == 0 ? "dead_life" : "");
    if (flag_replays == 1) {
        $player.addClass("replays");
    }

    if (player.observer_slot <= 5) {
        $player.find(".player_name").removeClass("dead_name_left").addClass("alive_name").removeClass(statistics.health == 0 ? "alive_namet" : "").addClass(statistics.health == 0 ? "dead_name_left" : "");
    } else {
        $player.find(".player_name").removeClass("dead_name_right").addClass("alive_name").removeClass(statistics.health == 0 ? "alive_name" : "").addClass(statistics.health == 0 ? "dead_name_right" : "");

    }

    /* ################################################################################################################################### */

    // SIDE COLORS

    if (team == "ct") {
        $player.find(".Health_Bar>.Health_Bar_Color").css("background-color", "rgb(" + ct_color + ")");
        $player.find(".Health_Bar").css("background-color", "rgba(" + ct_color + ",0.2)");
    } else if (team == "t") {
        $player.find(".Health_Bar>.Health_Bar_Color").css("background-color", "rgb(" + t_color + ")");
        $player.find(".Health_Bar").css("background-color", "rgb(" + t_color + ",0.2)");
    }

    if (player.observer_slot <= 5) {

        player_name = player.name;
        if (player_name.length > 13) player_name = player_name.substring(0, 13);
        $player.find(".Name").html(player_name.split(" ").join(""));

        $player.find(".number").html(player.observer_slot);

        $player.find(".Health_Bar>.Health_Bar_Color").css("width", statistics.health + "%");
        /* Para fazer flash
                if (statistics.health == 0) {
                    var flash_amount = 0;
                } else {
                    var flash_amount = (statistics.flashed * 0.9 / 255);
                }
                $player.find(".flash").css("background", "rgba(255,255,255," + flash_amount + ")");
        */
        l_team_value = l_team_value + statistics.money;

        /*
        if (statistics.health == 0) {
            gradient = "linear-gradient(to " + side + ", rgb(25,25,25)" + (100 - statistics.health) + "%, " + health_color + " " + (100 - statistics.health) + "%)";
            if ($player.find(".player_bar").hasClass("test")) {} else {
                $player.find(".player_bar").addClass('test');
            }
        } else {
            $top.find(".player_bar").removeClass('test');
        } */

    } else if (player.observer_slot < 10) {
        player_name = player.name;
        if (player_name.length > 13) player_name = player_name.substring(0, 13);
        $player.find(".Name").html(player_name.split(" ").join(""));

        $player.find(".number").html(player.observer_slot);

        $player.find(".Health_Bar>.Health_Bar_Color").css("width", statistics.health + "%");
        /*
        if (statistics.health == 0) {
            var flash_amount = 0;
        } else {
            var flash_amount = (statistics.flashed * 0.9 / 255);
        }
        $player.find(".flash").css("background", "rgba(255,255,255," + flash_amount + ")");

        if (statistics.health == 0) {
            gradient = "linear-gradient(to " + side + ", rgb(25,25,25)" + (100 - statistics.health) + "%, " + health_color + " " + (100 - statistics.health) + "%)";
            if ($top.find(".player_bar").hasClass("test")) {} else {
                $top.find(".player_bar").addClass('test');
            }
        } else {
            $top.find(".player_bar").removeClass('test');
        }

        if (statistics.health <= 98) {
            $top.find(".health_bar").css("border-radius", "0px 0px 0px 0px")
            $top.find(".player_bar_shadow").css("border-radius", "0px 0px 0px 0px")
        } else {
            $top.find(".health_bar").css("border-radius", " 0px 0px 0px 0px")
            $top.find(".player_bar_shadow").css("border-radius", "0px 0px 0px 0px")
        }
        */
        r_team_value = r_team_value + statistics.money;

    } else if (player.observer_slot == 10) {

        player_name = player.name;
        if (player_name.length > 13) player_name = player_name.substring(0, 13);
        $player.find(".Name").html(player_name.split(" ").join(""));

        $player.find(".number").html("0");

        $player.find(".Health_Bar>.Health_Bar_Color").css("width", statistics.health + "%");

        /*
        if (statistics.health == 0) {
            var flash_amount = 0;
            0
        } else {
            var flash_amount = (statistics.flashed * 0.9 / 255);
        }
        $player.find(".flash").css("background", "rgba(255,255,255," + flash_amount + ")");

        if (statistics.health == 0) {
            gradient = "linear-gradient(to " + side + ", rgb(25,25,25)" + (100 - statistics.health) + "%, " + health_color + " " + (100 - statistics.health) + "%)";
            if ($top.find(".player_bar").hasClass("test")) {} else {
                $top.find(".player_bar").addClass('test');
            }
        } else {
            $top.find(".player_bar").removeClass('test');
        }

        if (statistics.health <= 98) {
            $top.find(".health_bar").css("border-radius", "0px 0px 0px 0px")
            $top.find(".player_bar_shadow").css("border-radius", "0px 0px 0px 0px")
        } else {
            $top.find(".health_bar").css("border-radius", " 0px 0px 0px 0px")
            $top.find(".player_bar_shadow").css("border-radius", "0px 0px 0px 0px")
        }
        */
        r_team_value = r_team_value + statistics.money;
    }


    $player.find(".Health_Bar>.Health").html(statistics.health);


    $player.find(".Kills").html(statistics.kills);
    $player.find(".Deaths").html(statistics.deaths);



    if (statistics.defusekit) {
        $player.find(".defuse_bomb_icon").css("opacity", "1");
    } else {
        $player.find(".defuse_bomb_icon").css("opacity", "0");
    }
    if (statistics.armor) {
        $player.find(".Health_Bar>.Shield_Icon").css("opacity", "1");
    }
    if (statistics.armor && statistics.helmet) {
        $player.find(".Health_Bar>.Helmet_Icon").css("opacity", "1");
    } else {
        $player.find(".Health_Bar>.Helmet_Icon").css("opacity", "0");
    }


    $player.find(".Money").html("$" + statistics.money);

    $player.find(".Weapon>.Weapon_Icon").css("opacity", "0");
    $player.find("#utility").html("");


    for (let key in weapons) {
        let weapon = weapons[key];
        let name = weapon.name.replace("weapon_", "");
        let state = weapon.state;
        let view = "";
        let type = weapon.type;
        if (type != "C4" && type != "Knife") {
            view += weapon.state == "active" ? "checked" : "";
            if (type == "Grenade") {
                for (let x = 0; x < weapon.ammo_reserve; x++) {
                    $player.find("#utility").append($("<img />").attr("src", "/files/img/grenades/weapon_" + name + ".png"));
                }
            } else if (type) {
                view += side == "right" ? " img-hor" : "";
                if (weapon.state == "active") {
                    if (type == "Pistol") {
                        if (side == "right") {
                            $player.find(".Weapon>.Weapon_Icon").css("background-image", " url(../../files/img/weapons/" + name + ".png)")
                            $player.find(".Weapon>.Weapon_Icon").css("opacity", "1");
                        } else {
                            $player.find(".Weapon>.Weapon_Icon").css("background-image", " url(../../files/img/weapons/" + name + ".png)")
                            $player.find(".Weapon>.Weapon_Icon").css("opacity", "1");
                        }

                    } else {

                        if (side == "right") {
                            $player.find(".Weapon>.Weapon_Icon").css("background-image", " url(../../files/img/weapons/" + name + ".png)")
                            $player.find(".Weapon>.Weapon_Icon").css("opacity", "1");
                        } else {
                            $player.find(".Weapon>.Weapon_Icon").css("background-image", " url(../../files/img/weapons/" + name + ".png)")
                            $player.find(".Weapon>.Weapon_Icon").css("opacity", "1");
                        }

                    }
                }
            }
        }
        if (type == "C4") {
            $player.find(".defuse_bomb_icon").css("background-image", "url(../../files/img/Icons/Icons/Equipment_Bomb.png)");
        }

    }


    if (!start_money[steamid]) {
        start_money[steamid] = statistics.money;
    }
    $("#money_bar" + slot).find("#stat_money_bar").html("-" + (start_money[steamid] - statistics.money) + "$");
}


var isDefusing = false;


var bomb_time,
    bomb_timer,
    bomb_timer_css;
bomb_time = 0;

function bomb(time) {
    if (Math.pow((time - bomb_time), 2) > 1) {
        clearInterval(bomb_timer);
        bomb_time = parseFloat(time);
        if (bomb_time > 0) {
            bomb_timer = setInterval(function() {
                bomb_time = bomb_time - 0.01;
            }, 10);
        } else {
            clearInterval(bomb_timer);
        }
    }
}

function resetBomb() {
    clearInterval(bomb_timer);
}


//SOME other weird vars
var menu = false;
var freezetime = false;
let last_round = 0;

function updatePage(data) {

    var observed = data.getObserved();
    var phase = data.phase();
    var team_one = data.getTeamOne();
    var team_two = data.getTeamTwo();

    var matchup = data.getMatchType();
    var match = data.getMatch();
    if (matchup && matchup.toLowerCase() != "none") {


        var block = $("<div class='block'></div>");
        var left_bl = $("<div></div>");
        var right_bl = $("<div></div>");
        for (var x = 0; x < (matchup == "bo5" ? 3 : 2); x++) {
            block.clone().appendTo($(left_bl)).addClass(match.team_1.map_score > x ? "win" : "");
            block.clone().appendTo(right_bl).addClass(match.team_2.map_score > x ? "win" : "");
        }

        $(".header_container .left_series").html(left_bl);
        $(".header_container .right_series").html(right_bl);

        $(".block").css("display", "-webkit-inline-box");
        $("#ticker_text").text("BEST OF " + matchup.substr(2));

    } else {

        $("#ticker_text").html(ticker_text);
        $(".block").css("display", "none");

    }
    // Important
    if (observed.steamid == 1 || !observed) {
        $(".Spectate_Container").removeClass("observed_tr").addClass("not_observed_tr");
    } else if (observed) {
        menu = (data.info.player.activity == "menu");
        $(".Spectate_container").removeClass("not_observed_tr").addClass("observed_tr");
    }

    let left,
        right;
    var players = data.getPlayers();
    var round = data.round();
    var map = data.map();
    var previously = data.previously();

    var map3 = map.name.slice(3);
    var round_now = map.round + (round.phase == "over" || round.phase == "intermission" ?
        0 :
        1);
    if ((round.phase == "freezetime" && !freezetime) || round_now != last_round) {
        start_money = {};
    }


    var round_wins = map.round_wins;
    var result = [];
    for (var i in round_wins)
        result.push([i, round_wins[i]]);

    to1 = result.length;
    to = to1 + 0;

    let round_html = "";
    let round_html_ct_first = "";
    let round_html_t_first = "";
    let round_html_ct_second = "";
    let round_html_t_second = "";
    let ifOT = "";



    for (i = 0; i < result.length; i++) {

        nr = i + 1;

        if (map.round <= 30) {
            if (nr <= 15) {

                ifOT = "";

                if (round_wins[nr].startsWith('ct_')) {
                    round_html_ct_first = round_html_ct_first + "<div class='" + round_wins[nr] + "'><img src='../files/img/round_history/" + round_wins[nr] + ".png'></img></div>";
                } else {
                    round_html_ct_first = round_html_ct_first + "<div class='none'><img src='../files/img/round_history/none.png'></img></div>";
                }

                if (round_wins[nr].startsWith('t_')) {
                    round_html_t_first = round_html_t_first + "<div class='" + round_wins[nr] + "'><img src='../files/img/round_history/" + round_wins[nr] + ".png'></img></div>";
                } else {
                    round_html_t_first = round_html_t_first + "<div class='none'><img src='../files/img/round_history/none.png'></img></div>";
                }
            } else if (nr > 15 && nr <= 30) {

                ifOT = "";

                if (round_wins[nr].startsWith('ct_')) {
                    round_html_ct_second = round_html_ct_second + "<div class='" + round_wins[nr] + "'><img src='../files/img/round_history/" + round_wins[nr] + ".png'></img></div>";
                } else {
                    round_html_ct_second = round_html_ct_second + "<div class='none'><img src='../files/img/round_history/none.png'></img></div>";
                }

                if (round_wins[nr].startsWith('t_')) {
                    round_html_t_second = round_html_t_second + "<div class='" + round_wins[nr] + "'><img src='../files/img/round_history/" + round_wins[nr] + ".png'></img></div>";
                } else {
                    round_html_t_second = round_html_t_second + "<div class='none'><img src='../files/img/round_history/none.png'></img></div>";
                }
            }
        } else if (map.round == 31) {

        } else if (map.round > 31) {
            if (nr <= 3) {

                ifOT = "<div class='none'><img src='../files/img/round_history/none.png'></img></div><div class='none'><img src='../files/img/round_history/none.png'></img></div><div class='none'><img src='../files/img/round_history/none.png'></img></div><div class='none'><img src='../files/img/round_history/none.png'></img></div><div class='none'><img src='../files/img/round_history/none.png'></img></div><div class='none'><img src='../files/img/round_history/none.png'></img></div><div class='none'><img src='../files/img/round_history/none.png'></img></div><div class='none'><img src='../files/img/round_history/none.png'></img></div><div class='none'><img src='../files/img/round_history/none.png'></img></div><div class='none'><img src='../files/img/round_history/none.png'></img></div><div class='none'><img src='../files/img/round_history/none.png'></img></div><div class='none'><img src='../files/img/round_history/none.png'></img></div>";

                if (round_wins[nr].startsWith('ct_')) {
                    round_html_ct_first = round_html_ct_first + "<div class='" + round_wins[nr] + "'><img src='../files/img/round_history/" + round_wins[nr] + ".png'></img></div>";
                } else {
                    round_html_ct_first = round_html_ct_first + "<div class='none'><img src='../files/img/round_history/none.png'></img></div>";
                }

                if (round_wins[nr].startsWith('t_')) {
                    round_html_t_first = round_html_t_first + "<div class='" + round_wins[nr] + "'><img src='../files/img/round_history/" + round_wins[nr] + ".png'></img></div>";
                } else {
                    round_html_t_first = round_html_t_first + "<div class='none'><img src='../files/img/round_history/none.png'></img></div>";
                }
            }
            if (nr <= 6 && nr > 3) {

                if (round_wins[nr].startsWith('ct_')) {
                    round_html_ct_second = round_html_ct_second + "<div class='" + round_wins[nr] + "'><img src='../files/img/round_history/" + round_wins[nr] + ".png'></img></div>";
                } else {
                    round_html_ct_second = round_html_ct_second + "<div class='none'><img src='../files/img/round_history/none.png'></img></div>";
                }

                if (round_wins[nr].startsWith('t_')) {
                    round_html_t_second = round_html_t_second + "<div class='" + round_wins[nr] + "'><img src='../files/img/round_history/" + round_wins[nr] + ".png'></img></div>";
                } else {
                    round_html_t_second = round_html_t_second + "<div class='none'><img src='../files/img/round_history/none.png'></img></div>";
                }
            }


        }


    }


    $("#stat_ct_first").html(ifOT + round_html_ct_first);
    $("#stat_ct_second").html(round_html_ct_second);
    $("#stat_t_first").html(ifOT + round_html_t_first);
    $("#stat_t_second").html(round_html_t_second);


    var longd = 10;
    var team_ct = data.getCT();
    var team_t = data.getT();
    var test_player2 = data.getPlayer(2);
    var tscore = [];
    $("body").css("display", !map || menu ?
        "none" :
        "block");
    if (test_player2) {
        left = test_player2
            .team
            .toLowerCase() == "ct" ?
            team_ct :
            team_t;
        right = test_player2
            .team
            .toLowerCase() != "ct" ?
            team_ct :
            team_t;

        crlleft = left.consecutive_round_losses;
        crlright = right.consecutive_round_losses;

        teams.left.timeouts = left.timeouts_remaining;
        teams.right.timeouts = right.timeouts_remaining;

        teams.left.name = team_one.team_name || left.name;
        teams.right.name = team_two.team_name || right.name;

        teams.left.score = left.score;
        teams.right.score = right.score;

        teams.left.flag = team_one.country_code || null;
        teams.right.flag = team_two.country_code || null;

        teams.left.logo = team_one.logo || null;
        teams.right.logo = team_two.logo || null;

        teams.left.map_score = team_one.map_score || 0;
        teams.right.map_score = team_two.map_score || 0;

        teams.left.side = left.side || null;
        teams.right.side = right.side || null;

        teams.left.players = left.players || null;
        teams.right.players = right.players || null;

        $("#left_blocks")
            .removeClass("ct t")
            .addClass(test_player2.team.toLowerCase());
        $("#right_blocks")
            .removeClass("ct t")
            .addClass(test_player2.team.toLowerCase() != "ct" ?
                "ct" :
                "t");

        var crl_value_left = 0;
        var crl_value_right = 0;
        var crl_x_left = 0;
        var crl_x_right = 0;

        if (crlleft == 0) {
            crl_value_left = 1400;
            crl_x_left = 0;
        } else if (crlleft == 1) {
            crl_value_left = 1900;
            crl_x_left = 1;
        } else if (crlleft == 2) {
            crl_value_left = 2400;
            crl_x_left = 2;
        } else if (crlleft == 3) {
            crl_value_left = 2900;
            crl_x_left = 3;
        } else if (crlleft >= 4) {
            crl_value_left = 3400;
            crl_x_left = 4;
        }

        if (crlright == 0) {
            crl_value_right = 1400;
            crl_x_right = 0;
        } else if (crlright == 1) {
            crl_value_right = 1900;
            crl_x_right = 1;
        } else if (crlright == 2) {
            crl_value_right = 2400;
            crl_x_right = 2;
        } else if (crlright == 3) {
            crl_value_right = 2900;
            crl_x_right = 3;
        } else if (crlright >= 4) {
            crl_value_right = 3400;
            crl_x_right = 4;
        }





        // Update Firepower


        var total_money = left.equip_value + right.equip_value;
        var left_percentage = left.equip_value / total_money * 100;
        var right_percentage = right.equip_value / total_money * 100;

        $(".firepower > .left").css("width", left_percentage + "%");
        $(".firepower > .right").css("width", right_percentage + "%");

        /*$("#Money_Team_A").html("$" + left.team_money + "<br>$" + left.equip_value + "<br>$" + crl_value_left + " [x" + crl_x_left + "]");
        $("#Money_Team_B").html(right.team_money + "$<br>" + right.equip_value + "$<br>[x" + crl_x_right + "] " + crl_value_right + "$");*/
    }


    /* Update Header */

    // Update Round
    var round_now = teams.left.score + teams.right.score + 1;
    $(".Top_Bar>.Round_BG>.Round").html("ROUND " + round_now + "/30");

    // Update Names
    $(".Top_Bar>.Team_A>.Top_BG>.Team_A_Name").html(teams.left.name);
    $(".Top_Bar>.Team_B>.Top_BG>.Team_B_Name").html(teams.right.name);


    // Update Colors

    var left_color;
    var right_color;

    // Testing Teams
    if (teams.left.side == "ct" && teams.right.side == "t") {

        left_color = ct_color;
        right_color = t_color;
        dark_left_color = dark_ct_color;
        dark_right_color = dark_t_color;
        $(".Top_Bar>.Team_A>.Score_Team_A_BG").css("background-image", "url(../../files/img/hud_elements/Score_Team_A_Noise.png)");
        $(".Top_Bar>.Team_B>.Score_Team_B_BG").css("background-image", "url(../../files/img/hud_elements/Score_Team_B_Noise.png)");
        $(".Top_Bar>.Team_A>.Logo_Team_A_BG").css("scaleX", "1");
        $(".Top_Bar>.Team_A>.Logo_Team_A_BG").css("background-image", "url(../../files/img/hud_elements/Logo_Team_A_Noise.png)");
        $(".Top_Bar>.Team_B>.Logo_Team_B_BG").css("background-image", "url(../../files/img/hud_elements/Logo_Team_B_Noise.png)");
        $(".Top_Bar>.Team_B>.Logo_Team_B_BG").css("scaleX", "1");
    } else if (teams.left.side == "t" && teams.right.side == "ct") {

        left_color = t_color;
        right_color = ct_color;
        dark_left_color = dark_t_color;
        dark_right_color = dark_ct_color;

        $(".Top_Bar>.Team_A>.Score_Team_A_BG").css("background-image", "url(../../files/img/hud_elements/Score_Team_B_Noise.png)");
        $(".Top_Bar>.Team_B>.Score_Team_B_BG").css("background-image", "url(../../files/img/hud_elements/Score_Team_A_Noise.png)");

        $(".Top_Bar>.Team_A>.Logo_Team_A_BG").css("background-image", "url(../../files/img/hud_elements/Logo_Team_B_Noise.png)");
        $(".Top_Bar>.Team_A>.Logo_Team_A_BG").css("scaleX", "-1");
        $(".Top_Bar>.Team_B>.Logo_Team_B_BG").css("background-image", "url(../../files/img/hud_elements/Logo_Team_A_Noise.png)");
        $(".Top_Bar>.Team_B>.Logo_Team_B_BG").css("scaleX", "-1");
    }

    // Apply

    /* MAP PICKS START  */

    if (swappicksides == 0) {

        $(".map_picks>.first_map>.text_container").html("<font color='#fff'>" + teams.left.name + "</font>");
        $(".map_picks>.first_map>.text_container").css("background", "rgba(" + left_color + ", 0.8)");
        $(".map_picks>.first_map").css("background-image", "url(../../files/img/maps/" + map1 + ".jpg)");
        $(".map_picks>.first_map").css("border", "solid 4px rgb(" + left_color + ")");
        $(".map_picks>.first_map>.text_container_2").html("<font color='#fff'>" + map1 + "</font>");
        $(".map_picks>.first_map>.text_container_3").html("<font color='#fff'>" + map1_res1 + " - " + map1_res2 + "</font>");

        if (playing == 1) {
            $(".map_picks>.first_map>.text_container_3").html("<font color='#fff'> CURRENT </font>");
            $(".map_picks>.first_map>.text_container_3").css("font-size", "19px");
            $(".map_picks>.first_map>.text_container_3").css("line-height", "1.2");
            $(".map_picks>.first_map").css("box-shadow", "inset 0 -45px 45px  rgba(" + left_color + ",0.6)");
        } else {
            $(".map_picks>.first_map>.text_container_3").html("<font color='#fff'>" + map1_res1 + " - " + map1_res2 + "</font>");
            $(".map_picks>.first_map").css("box-shadow", "inset 0 -50px 50px  rgba(3,16,35,0.8)");
            $(".map_picks>.first_map>.text_container_3").css("line-height", "1.05");
        }

        $(".map_picks>.second_map>.text_container").html("<font color='#fff'> " + teams.right.name + " </font>");
        $(".map_picks>.second_map>.text_container").css("background", "rgba(" + right_color + ", 0.8)");
        $(".map_picks>.second_map").css("background-image", "url(../../files/img/maps/" + map2 + ".jpg)");
        $(".map_picks>.second_map").css("border", "solid 4px rgb(" + right_color + ")");
        $(".map_picks>.second_map>.text_container_2").html("<font color='#fff'>" + map2 + "</font>");

        if (playing == 2) {
            $(".map_picks>.second_map>.text_container_3").html("<font color='#fff'>CURRENT</font>");
            $(".map_picks>.second_map>.text_container_3").css("font-size", "19px");
            $(".map_picks>.second_map>.text_container_3").css("line-height", "1.2");
            $(".map_picks>.second_map").css("box-shadow", "inset 0 -45px 45px  rgba(" + right_color + ",0.6)");
        } else if (playing == 1) {
            $(".map_picks>.second_map>.text_container_3").html("<font color='#fff'> NEXT </font>");
            $(".map_picks>.second_map>.text_container_3").css("font-size", "19px");
            $(".map_picks>.second_map>.text_container_3").css("line-height", "1.2");
            $(".map_picks>.second_map").css("box-shadow", "inset 0 -50px 50px  rgba(3,16,35,0.8)");
        } else {
            $(".map_picks>.second_map>.text_container_3").html("<font color='#fff'>" + map2_res1 + " - " + map2_res2 + "</font>");
            $(".map_picks>.second_map").css("box-shadow", "inset 0 -50px 50px  rgba(3,16,35,0.8)");
            $(".map_picks>.second_map>.text_container_3").css("line-height", "1.05");
        }

        $(".map_picks>.decider_map>.text_container").html("<font color='#fff'> DECIDER </font>");
        $(".map_picks>.decider_map>.text_container").css("background", "rgba(3,16,35, 0.8)");
        $(".map_picks>.decider_map").css("background-image", "url(../../files/img/maps/" + map3 + ".jpg)");
        $(".map_picks>.decider_map").css("border", "solid 4px rgb(3,16,35)");
        $(".map_picks>.decider_map>.text_container_2").html("<font color='#fff'>" + map3 + "</font>");

        if (playing == 2) {
            $(".map_picks>.decider_map>.text_container_3").html("<font color='#fff'>NEXT</font>");
            $(".map_picks>.decider_map>.text_container_3").css("font-size", "19px");
            $(".map_picks>.decider_map>.text_container_3").css("line-height", "1.2");
            $(".map_picks>.decider_map").css("box-shadow", "inset 0 -50px 50px  rgba(3,16,35,0.8)");
        } else if (playing == 1) {
            $(".map_picks>.decider_map>.text_container_3").html("<font color='#fff'></font>");
            $(".map_picks>.decider_map>.text_container_3").css("font-size", "19px");
            $(".map_picks>.decider_map>.text_container_3").css("line-height", "1.2");
            $(".map_picks>.decider_map").css("box-shadow", "inset 0 -50px 50px  rgba(3,16,35,0.8)");
        } else {
            $(".map_picks>.decider_map>.text_container_3").html("<font color='#fff'>CURRENT</font>");
            $(".map_picks>.decider_map>.text_container_3").css("font-size", "19px");
            $(".map_picks>.decider_map>.text_container_3").css("line-height", "1.2");
            $(".map_picks>.decider_map").css("box-shadow", "inset 0 -45px 45px  rgba(3,16,35,0.45)");
        }

    } else {
        $(".map_picks>.first_map>.text_container").html("<font color='#fff'>" + teams.right.name + "</font>");
        $(".map_picks>.first_map>.text_container").css("background", "rgba(" + right_color + ", 0.8)");
        $(".map_picks>.first_map").css("background-image", "url(../../files/img/maps/" + map1 + ".jpg)");
        $(".map_picks>.first_map").css("border", "solid 4px rgb(" + right_color + ")");
        $(".map_picks>.first_map>.text_container_2").html("<font color='#fff'>" + map1 + "</font>");
        $(".map_picks>.first_map>.text_container_3").html("<font color='#fff'>" + map1_res1 + " - " + map1_res2 + "</font>");



        $(".map_picks>.first_map>.text_container").html("<font color='#fff'>" + teams.right.name + "</font>");
        $(".map_picks>.first_map>.text_container").css("background", "rgba(" + right_color + ", 0.8)");
        $(".map_picks>.first_map").css("background-image", "url(../../files/img/maps/" + map1 + ".jpg)");
        $(".map_picks>.first_map").css("border", "solid 4px rgb(" + right_color + ")");
        $(".map_picks>.first_map>.text_container_2").html("<font color='#fff'>" + map1 + "</font>");
        $(".map_picks>.first_map>.text_container_3").html("<font color='#fff'>" + map1_res1 + " - " + map1_res2 + "</font>");

        if (playing == 1) {
            $(".map_picks>.first_map>.text_container_3").html("<font color='#fff'> CURRENT </font>");
            $(".map_picks>.first_map>.text_container_3").css("font-size", "19px");
            $(".map_picks>.first_map>.text_container_3").css("line-height", "1.2");
            $(".map_picks>.first_map").css("box-shadow", "inset 0 -45px 45px  rgba(" + right_color + ",0.6)");
        } else {
            $(".map_picks>.first_map>.text_container_3").html("<font color='#fff'>" + map1_res1 + " - " + map1_res2 + "</font>");
            $(".map_picks>.first_map").css("box-shadow", "inset 0 -50px 50px  rgba(3,16,35,0.8)");
            $(".map_picks>.first_map>.text_container_3").css("line-height", "1.05");
        }

        $(".map_picks>.second_map>.text_container").html("<font color='#fff'> " + teams.left.name + " </font>");
        $(".map_picks>.second_map>.text_container").css("background", "rgba(" + left_color + ", 0.8)");
        $(".map_picks>.second_map").css("background-image", "url(../../files/img/maps/" + map2 + ".jpg)");
        $(".map_picks>.second_map").css("border", "solid 4px rgb(" + left_color + ")");
        $(".map_picks>.second_map>.text_container_2").html("<font color='#fff'>" + map2 + "</font>");

        if (playing == 2) {
            $(".map_picks>.second_map>.text_container_3").html("<font color='#fff'>CURRENT</font>");
            $(".map_picks>.second_map>.text_container_3").css("font-size", "19px");
            $(".map_picks>.second_map>.text_container_3").css("line-height", "1.2");
            $(".map_picks>.second_map").css("box-shadow", "inset 0 -45px 45px  rgba(" + left_color + ",0.6)");
        } else if (playing == 1) {
            $(".map_picks>.second_map>.text_container_3").html("<font color='#fff'> NEXT </font>");
            $(".map_picks>.second_map>.text_container_3").css("font-size", "19px");
            $(".map_picks>.second_map>.text_container_3").css("line-height", "1.2");
            $(".map_picks>.second_map").css("box-shadow", "inset 0 -50px 50px  rgba(3,16,35,0.8)");
        } else {
            $(".map_picks>.second_map>.text_container_3").html("<font color='#fff'>" + map2_res1 + " - " + map2_res2 + "</font>");
            $(".map_picks>.second_map").css("box-shadow", "inset 0 -50px 50px  rgba(3,16,35,0.8)");
            $(".map_picks>.second_map>.text_container_3").css("line-height", "1.05");
        }

        $(".map_picks>.decider_map>.text_container").html("<font color='#fff'> DECIDER </font>");
        $(".map_picks>.decider_map>.text_container").css("background", "rgba(3,16,35, 0.8)");
        $(".map_picks>.decider_map").css("background-image", "url(../../files/img/maps/" + map3 + ".jpg)");
        $(".map_picks>.decider_map").css("border", "solid 4px rgb(3,16,35)");
        $(".map_picks>.decider_map>.text_container_2").html("<font color='#fff'>" + map3 + "</font>");

        if (playing == 2) {
            $(".map_picks>.decider_map>.text_container_3").html("<font color='#fff'>NEXT</font>");
            $(".map_picks>.decider_map>.text_container_3").css("font-size", "19px");
            $(".map_picks>.decider_map>.text_container_3").css("line-height", "1.2");
            $(".map_picks>.decider_map").css("box-shadow", "inset 0 -50px 50px  rgba(3,16,35,0.8)");
        } else if (playing == 1) {
            $(".map_picks>.decider_map>.text_container_3").html("<font color='#fff'></font>");
            $(".map_picks>.decider_map>.text_container_3").css("font-size", "19px");
            $(".map_picks>.decider_map>.text_container_3").css("line-height", "1.2");
            $(".map_picks>.decider_map").css("box-shadow", "inset 0 -50px 50px  rgba(3,16,35,0.8)");
        } else {
            $(".map_picks>.decider_map>.text_container_3").html("<font color='#fff'>CURRENT</font>");
            $(".map_picks>.decider_map>.text_container_3").css("font-size", "19px");
            $(".map_picks>.decider_map>.text_container_3").css("line-height", "1.2");
            $(".map_picks>.decider_map").css("box-shadow", "inset 0 -45px 45px  rgba(3,16,35,0.45)");
        }
    }
    $(".round_winner>.rounds").html("<font color='#fff'>1</font>");
    /* MAP PICKS FINITO  */


    /* LOSS BONUS START*/
    var loss_bonus_left = crl_x_left;
    var loss_bonus_right = crl_x_right;
    var money_bonus_right = crl_value_right;
    var money_bonus_left = crl_value_left;

    $(".right_bonus>.bonus_text>.real_text").html("<font color='#fff'> LOSS BONUS </font>");
    $(".right_bonus>.bonus_text").css("background", "rgba(" + right_color + ", 0.8)");
    $(".right_bonus").css("border", "solid 2px rgb(" + right_color + ")");
    $(".right_bonus").css("background-image", "url(../../files/img/hud_elements/back.png)");
    $(".right_bonus>.bonus_box_1").css("border", "solid 2px rgb(" + right_color + ")");
    $(".right_bonus>.bonus_box_2").css("border", "solid 2px rgb(" + right_color + ")");
    $(".right_bonus>.bonus_box_3").css("border", "solid 2px rgb(" + right_color + ")");
    $(".right_bonus>.bonus_box_4").css("border", "solid 2px rgb(" + right_color + ")");


    if (loss_bonus_right == 0) {
        $(".right_bonus>.bonus_box_1").css("background", "rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_2").css("background", "rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_3").css("background", "rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_4").css("background", "rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_1").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_2").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_3").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_4").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0)");
    } else if (loss_bonus_right == 1) {
        $(".right_bonus>.bonus_box_1").css("background", "rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_2").css("background", "rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_3").css("background", "rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_4").css("background", "rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_1").css("box-shadow", "0px 0px 10px 2px  rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_2").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_3").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_4").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0)");
    } else if (loss_bonus_right == 2) {
        $(".right_bonus>.bonus_box_1").css("background", "rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_2").css("background", "rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_3").css("background", "rgba(255,255,255 , 0.1)");
        $(".right_bonus>.bonus_box_4").css("background", "rgba(255,255,255 , 0.1)");
        $(".right_bonus>.bonus_box_1").css("box-shadow", "0px 0px 10px 2px  rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_2").css("box-shadow", "0px 0px 10px 2px  rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_3").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_4").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0)");
    } else if (loss_bonus_right == 3) {
        $(".right_bonus>.bonus_box_1").css("background", "rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_2").css("background", "rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_3").css("background", "rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_4").css("background", "rgba(255,255,255 , 0)");
        $(".right_bonus>.bonus_box_1").css("box-shadow", "0px 0px 10px 2px  rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_2").css("box-shadow", "0px 0px 10px 2px  rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_3").css("box-shadow", "0px 0px 10px 2px  rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_4").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0)");
    } else {
        $(".right_bonus>.bonus_box_1").css("background", "rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_2").css("background", "rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_3").css("background", "rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_4").css("background", "rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_1").css("box-shadow", "0px 0px 10px 2px  rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_2").css("box-shadow", "0px 0px 10px 2px  rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_3").css("box-shadow", "0px 0px 10px 2px  rgba(" + right_color + ", 0.8)");
        $(".right_bonus>.bonus_box_4").css("box-shadow", "0px 0px 10px 2px  rgba(" + right_color + ", 0.8)");
    }
    $(".right_bonus>.bonus_amount").html("$" + money_bonus_right);
    $(".right_bonus>.bonus_amount").css("color", "rgba(" + right_color + ", 1)");


    $(".left_bonus>.bonus_text>.real_text").html("<font color='#fff'> LOSS BONUS </font>");
    $(".left_bonus>.bonus_text").css("background", "rgba(" + left_color + ", 0.8)");
    $(".left_bonus").css("border", "solid 2px rgb(" + left_color + ")");
    $(".left_bonus").css("background-image", "url(../../files/img/hud_elements/back_left.png)");
    $(".left_bonus>.bonus_box_1").css("border", "solid 2px rgb(" + left_color + ")");
    $(".left_bonus>.bonus_box_2").css("border", "solid 2px rgb(" + left_color + ")");
    $(".left_bonus>.bonus_box_3").css("border", "solid 2px rgb(" + left_color + ")");
    $(".left_bonus>.bonus_box_4").css("border", "solid 2px rgb(" + left_color + ")");


    if (loss_bonus_left == 0) {
        $(".left_bonus>.bonus_box_1").css("background", "rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_2").css("background", "rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_3").css("background", "rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_4").css("background", "rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_1").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_2").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_3").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_4").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0.1)");
    } else if (loss_bonus_left == 1) {
        $(".left_bonus>.bonus_box_1").css("background", "rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_2").css("background", "rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_3").css("background", "rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_4").css("background", "rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_1").css("box-shadow", "0px 0px 10px 2px  rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_2").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_3").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_4").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0.1)");
    } else if (loss_bonus_left == 2) {
        $(".left_bonus>.bonus_box_1").css("background", "rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_2").css("background", "rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_3").css("background", "rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_4").css("background", "rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_1").css("box-shadow", "0px 0px 10px 2px  rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_2").css("box-shadow", "0px 0px 10px 2px  rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_3").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_4").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0.1)");
    } else if (loss_bonus_left == 3) {
        $(".left_bonus>.bonus_box_1").css("background", "rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_2").css("background", "rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_3").css("background", "rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_4").css("background", "rgba(255,255,255 , 0.1)");
        $(".left_bonus>.bonus_box_1").css("box-shadow", "0px 0px 10px 2px  rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_2").css("box-shadow", "0px 0px 10px 2px  rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_3").css("box-shadow", "0px 0px 10px 2px  rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_4").css("box-shadow", "0px 0px 10px 2px  rgba(255,255,255 , 0.1)");
    } else {
        $(".left_bonus>.bonus_box_1").css("background", "rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_2").css("background", "rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_3").css("background", "rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_4").css("background", "rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_1").css("box-shadow", "0px 0px 10px 2px  rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_2").css("box-shadow", "0px 0px 10px 2px  rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_3").css("box-shadow", "0px 0px 10px 2px  rgba(" + left_color + ", 0.8)");
        $(".left_bonus>.bonus_box_4").css("box-shadow", "0px 0px 10px 2px  rgba(" + left_color + ", 0.8)");
    }

    $(".left_bonus>.bonus_amount").html("$" + money_bonus_left);
    $(".left_bonus>.bonus_amount").css("color", "rgba(" + left_color + ", 1)");

    /* LOSS BONUS FINITO*/

    /* EQUIPMENT MONEY START*/


    $(".firepower_money_left>.team_container>.text_money>.text_true").html("<font color='#fff'>TEAM MONEY</font>");
    $(".firepower_money_left>.equip_container>.text_money>.text_true").html("<font color='#fff'>EQUIPMENT MONEY</font>");
    $(".firepower_money_left>.team_container").css("background-image", "url(../../files/img/hud_elements/back_left.png)");
    $(".firepower_money_left>.team_container>.text_money").css("background", "rgba(" + left_color + ", 0.9)");
    $(".firepower_money_left>.team_container").css("border", "solid 2px rgb(" + left_color + ")");
    $(".firepower_money_left>.equip_container").css("background-image", "url(../../files/img/hud_elements/back_left.png)");
    $(".firepower_money_left>.equip_container>.text_money").css("background", "rgba(" + left_color + ", 0.9)");
    $(".firepower_money_left>.equip_container").css("border", "solid 2px rgb(" + left_color + ")");


    $(".firepower_money_left>.team_container>.true_money").html("$" + left_team_value);
    $(".firepower_money_left>.equip_container>.true_money").html("$" + left.equip_value);
    $(".firepower_money_left>.team_container>.true_money").css("color", "rgba(" + left_color + ", 1)");
    $(".firepower_money_left>.equip_container>.true_money").css("color", "rgba(" + left_color + ", 1)");

    $(".firepower_money_right>.team_container>.text_money>.text_true").html("<font color='#fff'>TEAM MONEY</font>");
    $(".firepower_money_right>.equip_container>.text_money>.text_true").html("<font color='#fff'>EQUIPMENT MONEY</font>");
    $(".firepower_money_right>.team_container").css("background-image", "url(../../files/img/hud_elements/back_left.png)");
    $(".firepower_money_right>.team_container>.text_money").css("background", "rgba(" + right_color + ", 0.9)");
    $(".firepower_money_right>.team_container").css("border", "solid 2px rgb(" + right_color + ")");
    $(".firepower_money_right>.equip_container").css("background-image", "url(../../files/img/hud_elements/back_left.png)");
    $(".firepower_money_right>.equip_container>.text_money").css("background", "rgba(" + right_color + ", 0.9)");
    $(".firepower_money_right>.equip_container").css("border", "solid 2px rgb(" + right_color + ")");
    ~


    $(".firepower_money_right>.team_container>.true_money").html("$" + right_team_value);
    $(".firepower_money_right>.equip_container>.true_money").html("$" + right.equip_value);
    $(".firepower_money_right>.team_container>.true_money").css("color", "rgba(" + right_color + ", 1)");
    $(".firepower_money_right>.equip_container>.true_money").css("color", "rgba(" + right_color + ", 1)");


    /* EQUIPMENT MONEY FINITO*/
    for (i = 0; i <= 30; i++) {
        $(".round_winner>.team_right_" + i + ">.result ").css("background-image", "none");
        $(".round_winner>.team_left_" + i + ">.result ").css("background-image", "none");
        $(".round_winner>.rounds_" + i).css("background-color", "rgba(0,0,0,0)");
        $(".round_winner>.team_right_" + i).css("height", "32px");
        $(".round_winner>.team_left_" + i).css("height", "32px");
    }

    var total_rounds = teams.left.score + teams.right.score;
    if (total_rounds < 15) {
        $(".round_winner>.left_side_2").css("box-shadow", "inset 0px 0px 25px 3px rgb(" + t_color + ")");
        $(".round_winner>.left_side_1").css("box-shadow", "inset 0px 0px 25px 3px rgb(" + ct_color + ")");
    } else {
        $(".round_winner>.left_side_1").css("box-shadow", "inset 0px 0px 25px 3px rgb(" + t_color + ")");
        $(".round_winner>.left_side_2").css("box-shadow", "inset 0px 0px 25px 3px rgb(" + ct_color + ")");
    }

    var flag = 0;
    for (i = 0; i < result.length; i++) {
        if (total_rounds < 15) {
            nr = i + 1;
            $(".round_winner>.rounds_" + nr).html(nr);
            $(".round_winner>.rounds_" + nr).css("font-size", "10px");
            $(".round_winner>.rounds_" + nr).css("line-height", "1.4");
            $(".round_winner>.rounds_" + i).css("background-color", "rgba(0,0,0,0)");

            if (nr < 15) {
                if (round_wins[nr].startsWith('ct_')) {
                    $(".round_winner>.team_left_" + nr).css("box-shadow", "inset 0 -15px 13px  rgba(" + ct_color + ",0.8)");
                    if (round_wins[nr].startsWith('ct_win_elimination')) {
                        $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "url(../../files/img/deaths.png)");
                    } else if (round_wins[nr].startsWith('ct_win_defuse')) {
                        $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "url(/files/img/hud_elements/defuse.png)");
                    } else if (round_wins[nr].startsWith('ct_win_time')) {
                        $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "url(/files/img/hud_elements/ampulheta.png)");
                    }
                } else {
                    $(".round_winner>.team_left_" + nr + "").css("box-shadow", "inset 0 -15px 10px  rgba(0,0,0,0.15)");
                    $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "none");
                }

                if (round_wins[nr].startsWith('t_')) {
                    $(".round_winner>.team_right_" + nr).css("box-shadow", "inset 0 10px 15px  rgba(" + t_color + ",0.8)");
                    if (round_wins[nr].startsWith('t_win_elimination')) {
                        $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "url(../../files/img/deaths.png)");
                    } else if (round_wins[nr].startsWith('t_win_bomb')) {
                        $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "url(/files/img/elements/bomb.png");
                    }
                } else {
                    $(".round_winner>.team_right_" + nr + "").css("box-shadow", "inset 0 15px 10px  rgba(0,0,0,0.15)");
                    $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "none");
                }
            }
        } else if (total_rounds <= 30) {
            nr = i + 1;
            real_round = i + 16;
            if (total_rounds < 16) {
                for (j = 0; j < 16; j++) {
                    $(".round_winner>.team_left_" + j + "").css("box-shadow", "inset 0 0px 0px  rgba(" + ct_color + "0)");
                    $(".round_winner>.team_right_" + j + "").css("box-shadow", "inset 0 0px 0px  rgba(" + t_color + "0)");
                }
            }

            $(".round_winner>.rounds_" + nr).html(real_round);
            $(".round_winner>.rounds_" + nr).css("font-size", "10px");
            $(".round_winner>.rounds_" + nr).css("line-height", "1.4");
            $(".round_winner>.rounds_" + i).css("background-color", "rgba(0,0,0,0)");

            if (nr < 15) {
                if (round_wins[nr].startsWith('ct_')) {
                    $(".round_winner>.team_right_" + nr).css("box-shadow", "inset 0 10px 15px  rgba(" + ct_color + ",0.8)");
                    if (round_wins[nr].startsWith('ct_win_elimination')) {
                        $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "url(../../files/img/deaths.png)");
                    } else if (round_wins[nr].startsWith('ct_win_defuse')) {
                        $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "url(/files/img/hud_elements/defuse.png)");
                    } else if (round_wins[nr].startsWith('ct_win_time')) {
                        $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "url(/files/img/hud_elements/ampulheta.png)");
                    }
                } else {
                    $(".round_winner>.team_right_" + nr + "").css("box-shadow", "inset 0 -15px 10px  rgba(0,0,0,0.15)");
                    $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "none");
                }

                if (round_wins[nr].startsWith('t_')) {
                    $(".round_winner>.team_left_" + nr).css("box-shadow", "inset 0 -15px 13px  rgba(" + t_color + ",0.8)");
                    if (round_wins[nr].startsWith('t_win_elimination')) {
                        $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "url(../../files/img/deaths.png)");
                    } else if (round_wins[nr].startsWith('t_win_bomb')) {
                        $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "url(/files/img/elements/bomb.png");
                    }
                } else {
                    $(".round_winner>.team_left_" + nr + "").css("box-shadow", "inset 0 15px 10px  rgba(0,0,0,0.15)");
                    $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "none");
                }
            }
        } else {
            $(".round_winner").css("opacity", "0");
        }
    }


    /*
    for (i = 0; i < result.length; i++) {
        if (map.round <= 30) {
            nr = i + 1;
            $(".round_winner>.rounds_" + nr).html(nr);
            $(".round_winner>.rounds_" + nr).css("font-size", "10px");
            $(".round_winner>.rounds_" + nr).css("line-height", "1.4");
            $(".round_winner>.rounds_" + i).css("background-color", "rgba(0,0,0,0)");

            if (nr <= 15) {
                if (round_wins[nr].startsWith('ct_')) {
                    $(".round_winner>.team_left_" + nr).css("box-shadow", "inset 0 -15px 13px  rgba(" + ct_color + ",0.8)");
                    if (round_wins[nr].startsWith('ct_win_elimination')) {
                        $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "url(../../files/img/deaths.png)");
                    } else if (round_wins[nr].startsWith('ct_win_defuse')) {
                        $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "url(/files/img/hud_elements/defuse.png)");
                    } else if (round_wins[nr].startsWith('ct_win_time')) {
                        $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "url(/files/img/hud_elements/ampulheta.png)");
                    }
                } else {
                    $(".round_winner>.team_left_" + nr + "").css("box-shadow", "inset 0 -15px 10px  rgba(0,0,0,0.15)");
                    $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "none");
                }

                if (round_wins[nr].startsWith('t_')) {
                    $(".round_winner>.team_right_" + nr).css("box-shadow", "inset 0 10px 15px  rgba(" + t_color + ",0.8)");
                    if (round_wins[nr].startsWith('t_win_elimination')) {
                        $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "url(../../files/img/deaths.png)");
                    } else if (round_wins[nr].startsWith('t_win_bomb')) {
                        $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "url(/files/img/elements/bomb.png");
                        //$(".round_winner>.team_right_" + nr + ">.result ").css("filter", "invert(1)");
                    }
                } else {
                    $(".round_winner>.team_right_" + nr + "").css("box-shadow", "inset 0 15px 10px  rgba(0,0,0,0.15)");
                    $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "none");
                }
            } else if (nr <= 30) {
                if (round_wins[nr].startsWith('ct_')) {
                    $(".round_winner>.team_right_" + nr).css("box-shadow", "inset 0 10px 15px  rgba(" + ct_color + ",0.8)");
                    if (round_wins[nr].startsWith('ct_win_elimination')) {
                        $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "url(../../files/img/deaths.png)");
                    } else if (round_wins[nr].startsWith('ct_win_defuse')) {
                        $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "url(/files/img/hud_elements/defuse.png)");
                    } else if (round_wins[nr].startsWith('ct_win_time')) {
                        $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "url(/files/img/hud_elements/ampulheta.png)");
                    }
                } else {
                    $(".round_winner>.team_right_" + nr + "").css("box-shadow", "inset 0 15px 10px  rgba(0,0,0,0.15)");
                    $(".round_winner>.team_right_" + nr + ">.result ").css("background-image", "none");
                }

                if (round_wins[nr].startsWith('t_')) {
                    $(".round_winner>.team_left_" + nr).css("box-shadow", "inset 0 -15px 13px  rgba(" + t_color + ",0.8)");
                    if (round_wins[nr].startsWith('t_win_elimination')) {
                        $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "url(../../files/img/deaths.png)");
                    } else if (round_wins[nr].startsWith('t_win_bomb')) {
                        $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "url(/files/img/elements/bomb.png");
                        //$(".round_winner>.team_left_" + nr + ">.result ").css("filter", "invert(1)");
                    }
                } else {
                    $(".round_winner>.team_left_" + nr + "").css("box-shadow", "inset 0 -15px 10px  rgba(0,0,0,0.15)");
                    $(".round_winner>.team_left_" + nr + ">.result ").css("background-image", "none");
                }
            } else {
                $(".round_winner").css("opacity", "0");
            }
        } else {
            flag = 1;
        }

    } */

    $(".Top_Bar>.Team_A>.BO5_A>.BO5_Team_A_BG").css("background-color", "rgb(" + left_color + ")");
    $(".Top_Bar>.Team_A>.BO5_A>.Game_1_Team_A").css("background-color", "rgb(" + left_color + ")");
    //$(".Top_Bar>.Team_A>.BO5_A>.Game_2_Team_A").css("background-color", "rgb(" + left_color + ")");

    $(".Top_Bar>.Team_B>.BO5_B>.BO5_Team_B_BG").css("background-color", "rgb(" + right_color + ")");
    $(".Top_Bar>.Team_B>.BO5_B>.Game_1_Team_B").css("background-color", "rgb(" + right_color + ")");
    //$(".Top_Bar>.Team_B>.BO5_B>.Game_2_Team_B").css("background-color", "rgb(" + right_color + ")");


    $(".Progress_Bar>.Left_Team>.Background").css("background-color", "rgb(" + left_color + ")");
    $(".Progress_Bar>.Left_Team>.Progress").css("background-color", "rgb(" + left_color + ")");

    $(".Progress_Bar>.Right_Team>.Background").css("background-color", "rgb(" + right_color + ")");
    $(".Progress_Bar>.Right_Team>.Progress").css("background-color", "rgb(" + right_color + ")");



    // LEFT
    //$(".header_container > .left_logo_container > .logo_bg").css("background-color", "rgb(" + left_color + ")");
    /*
    $(".alerts_container > .left > .progress").css("background-color", "rgb(" + left_color + ")");
    $(".alerts_container > .left > .progress").css("box-shadow", "0px 0px 30px 6px rgb(" + left_color + ")");
    $(".alerts_container > .left > .progress_2").css("background-color", "rgb(" + left_color + ")");
    $(".alerts_container > .left > .progress_2").css("box-shadow", "0px 0px 30px 6px rgb(" + left_color + ")");
    $(".alerts_container > .left > .text").css("color", "rgb(" + left_color + ")");
    $(".alerts_container > .left > .background-image").css("url(../../files/img/hud_elements/back_left.png)");
    $(".left_name").css("color", "rgb(" + left_color + ")");
    $(".left_score").css("color", "rgb(" + left_color + ")");
    $(".player_count_left").css("color", "rgb(255,255,255)");
    $(".player_count_left").css("background-image", "url(../../files/img/hud_elements/back_left.png)");
    $(".player_count_left").css("border", "solid 2px rgb(" + left_color + ")");
    $(".player_count_left").css("box-shadow", "inset 0px 0px 20px 5px rgb(" + left_color + ")");

    $(".firepower > .left").css("background-color", "rgba(0, 0, 0 ,0.6)");
    $(".firepower > .left").css("box-shadow", "inset 0px 0px 13px 5px  rgba(" + left_color + ", 1)");

    $(".spam > .left_container").css("border", "2.5px solid rgb(" + left_color + ")");
    $(".spam > .left_container").css("background-image", "url(../../files/img/hud_elements/back_left.png)");


    $(".alerts_container > .right > .progress").css("background-color", "rgb(" + right_color + ")");
    $(".alerts_container > .right > .progress_2").css("background-color", "rgb(" + right_color + ")");
    $(".alerts_container > .right > .progress").css("box-shadow", "0px 0px 30px 6px rgb(" + right_color + ")");
    $(".alerts_container > .right > .progress_2").css("box-shadow", "0px 0px 30px 6px rgb(" + right_color + ")");
    $(".alerts_container > .right > .background").css("background-image", "url(../../files/img/hud_elements/back.png)");
    $(".alerts_container > .right > .text").css("color", "rgb(" + right_color + ")");
    $(".right_name").css("color", "rgb(" + right_color + ")");
    $(".right_score").css("color", "rgb(" + right_color + ")");
    $(".player_count_right").css("color", "rgb(255,255,255)");
    $(".player_count_right").css("background-image", "url(../../files/img/hud_elements/back.png)");
    $(".player_count_right").css("border", "solid 2px rgb(" + right_color + ")");
    $(".player_count_right").css("box-shadow", "inset 0px 0px 20px 5px rgb(" + right_color + ")");


    $(".spam > .right_container").css("background-image", "url(../../files/img/hud_elements/back.png)");
    $(".firepower > .right").css("background-color", "rgba(0, 0, 0 ,0.6)");
    $(".firepower > .right").css("box-shadow", "inset 0px 0px 13px 5px  rgba(" + right_color + ", 0.9)");

    $(".spam > .right_container").css("border", "2.5px solid rgb(" + right_color + ")");
    $(".spam > .right_container > .flash_container").css("background", right_gradient_spam);
    $(".spam > .right_container > .he_container").css("background", right_gradient_spam);
    $(".spam > .right_container > .molo_container").css("background", right_gradient_spam);
    $(".spam > .right_container > .smoke_container").css("background", right_gradient_spam);

    */
    // GLOBAL
    //$(".header_container").css("border-image", "linear-gradient(90deg, rgb(" + left_color + ") 0%, rgb(" + left_color + ") 50%, rgb(" + right_color + ") 50%, rgb(" + right_color + ") 100%)").css("border-image-slice", "1");


    // Update Scores



    $(".Top_Bar>.Team_A>.Score_Team_A_BG>.Score_Team_A").html(teams.left.score);
    $(".Top_Bar>.Team_B>.Score_Team_B_BG>.Score_Team_B").html(teams.right.score);

    // Update Molo Spam

    if (teams.left.side == "ct") {
        $(".spam > .left_container > .molo_container > .icon").css('background-image', 'url("/files/img/spam_count/ctmolo.png")');
    } else if (teams.left.side == "t") {
        $(".spam > .left_container > .molo_container > .icon").css('background-image', 'url("/files/img/spam_count/tmolo.png")');
    }

    if (teams.right.side == "ct") {
        $(".spam > .right_container > .molo_container > .icon").css('background-image', 'url("/files/img/spam_count/ctmolo.png")');
    } else if (teams.right.side == "t") {
        $(".spam > .right_container > .molo_container > .icon").css('background-image', 'url("/files/img/spam_count/tmolo.png")');
    }

    // Update Logos

    if (teams.left.logo) {
        if (teams.left.logo) {
            $(".Top_Bar>.Team_A>.Logo_Team_A_BG>.Logo_Team_A").css('background-image', 'url("/teams/' + teams.left.logo + '")');

        }
    } else {

    }
    if (teams.right.logo) {
        if (teams.right.logo) {
            $(".Top_Bar>.Team_B>.Logo_Team_B_BG>.Logo_Team_B").css('background-image', 'url("/teams/' + teams.right.logo + '")');
        }

    } else {}

    //EVERY OTHER PLAYER
    if (players) {

        var offset = 0;
        for (var sl in players) {
            let player = players[sl];
            if (avatars[player.steamid] != true && disp_avatars)
                loadAvatar(player.steamid);

            if (player.observer_slot <= 5 && offset == 0 && player.team.toLowerCase() != teams.left.side)
                offset = 6 - sl;
        }
        fillPlayers(teams);

    }

    //OBSERVED PLAYER

    if (observed && observed.steamid != 1 && observed.getStats()) {
        fillObserved(observed);
    }


    //PHASESc
    if (phase) {
        $("Top_Bar>.Timer_BG>.Timer").css("color", (phase.phase == "live" || phase.phase == "over" || phase.phase == "warmup" || (phase.phase == "freezetime" && phase.phase_ends_in > 10)) ?
            "rgb(255, 255, 255)" :
            "rgb(" + warning + ")");

        function startAnimationDefuse(name, side, long) {

            if (data.info.bomb.countdown > 0.2) {
                defuse_countdown = data.info.bomb.countdown;
            } else if (data.info.bomb.countdown <= 0.2) {
                defuse_countdown = 0.0;
            }

            var progress_width;

            if ($(".Progress_Bar").hasClass("longd")) {
                progress_width = defuse_countdown * 100 / 10 + "%";
            } else {
                progress_width = defuse_countdown * 100 / 5 + "%";
            }



            if (side == "left") {
                $(".Progress_Bar>.Center_Bar>.Center_Txt").html("DEFUSING BOMB");
                $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                $(".Progress_Bar>.Left_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px,0px)");
                $(".Progress_Bar>.Left_Team>.Progress").css("width", progress_width).css("transition", "all 0.5s ease-out 0s");
                $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
            } else {
                $(".Progress_Bar>.Center_Bar>.Center_Txt").html("DEFUSING BOMB");
                $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                $(".Progress_Bar>.Right_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px,0px)");
                $(".Progress_Bar>.Right_Team>.Progress").css("width", progress_width).css("transition", "all 0.5s ease-out 0s");
                $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
            }

        }


        function stopAnimationDefuse(side) {

            $(".Progress_Bar").hasClass("longd");

            setTimeout(function() {
                if ($(".Progress_Bar>.Center_Bar>.Center_Txt").text() == "DEFUSING BOMB") {
                    if (side == "left") {
                        $(".Progress_Bar>.Center_Bar>.Center_Txt").html("BOMB PLANTED");
                        $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                        $(".Progress_Bar>.Left_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px,0px)");
                        $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                    } else {
                        $(".Progress_Bar>.Center_Bar>.Center_Txt").html("BOMB PLANTED");
                        $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                        $(".Progress_Bar>.Right_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px,0px)");
                        $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                    }
                }
            }, 500);
        }

        function startAnimationPlanting(name, side, long) {

            var countdown = parseFloat(3.2) - parseFloat(data.info.bomb.countdown);
            countdown = countdown.toFixed(1);
            var progress_width = countdown * 100 / 3 + "%";

            if (side == "left") {
                $(".Progress_Bar>.Center_Bar>.Center_Txt").html("PLANTING BOMB");
                $(".Progress_Bar>.Left_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                $(".Progress_Bar>.Left_Team>.Progress").css("width", progress_width).css("transition", "all 0.5s ease-out 0s");
                $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
            } else {
                $(".Progress_Bar>.Center_Bar>.Center_Txt").html("PLANTING BOMB");
                $(".Progress_Bar>.Right_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                $(".Progress_Bar>.Right_Team>.Progress").css("width", progress_width).css("transition", "all 0.5s ease-out 0s");
                $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
            }
        }

        function stopAnimationPlanting(side) {

            setTimeout(function() {
                if ($(".Progress_Bar>.Center_Bar>.Center_Txt").text() == "PLANTING BOMB") {
                    if (side == "left") {
                        $(".Progress_Bar>.Center_Bar>.Center_Txt").html(" ");
                        $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                        $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                    } else {
                        $(".Progress_Bar>.Center_Bar>.Center_Txt").html(" ");
                        $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                        $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                    }
                }
            }, 200);

        }

        if (data.info.bomb.state == "planting") {

            var plantador;

            if (players) {

                var offset = 0;
                for (var sl in players) {
                    let player = players[sl];
                    if (player.steamid == data.info.bomb.player)
                        plantador = player.name;
                }
            }

            if (teams.left.side == "t") {
                startAnimationPlanting(plantador, "left");
            } else if (teams.right.side == "t") {
                startAnimationPlanting(plantador, "right");

            }


        } else {
            if (teams.left.side == "t") {
                stopAnimationPlanting("left");
            } else if (teams.right.side == "t") {
                stopAnimationPlanting("right");
            }
        }



        if (phase.phase == "bomb" || phase.phase == "defuse") {
            if (phase.phase == "bomb") {
                bomb(parseFloat(phase.phase_ends_in));
            }

            if (data.info.bomb.state == "defusing") {

                var defuser;
                var long;

                if (players) {

                    var offset = 0;
                    for (var sl in players) {
                        let player = players[sl];
                        if (player.steamid == data.info.bomb.player)
                            defuser = player.name;
                    }
                }


                if (data.info.bomb.countdown > 5) {
                    $(".Progress_Bar").addClass("longd");
                }


                if (teams.left.side == "ct") {
                    startAnimationDefuse(defuser, "left");
                } else if (teams.right.side == "ct") {
                    startAnimationDefuse(defuser, "right");
                }

            } else {
                if (teams.left.side == "ct") {
                    stopAnimationDefuse("left");
                } else if (teams.right.side == "ct") {
                    stopAnimationDefuse("right");
                }
            }

        } else {
            resetBomb();
            stopAnimationDefuse();
        }

        if (data.info.bomb.state == "defused") {
            stopAnimationDefuse();
        }

        let win = round.win_team;

        var rightside = teams.right.side;
        rightside = rightside.toUpperCase();

        var leftside = teams.left.side;
        leftside = leftside.toUpperCase();

        //WINNER ANIMATION

        function startAnimationWinner(side, name, gameside) {

            if (gameside == "ct") {
                //$(".win_container > .chicken").css("background-image", "url(/files/img/hud_elements/win_ct_chicken.png)");
                $(".win_container > .chicken").css("background-image", "url(../../files/img/round_win/ct.png)");
                $(".win_container>.bg_container>.bg").css("border", "solid 3px rgb(" + ct_color + ")");
                $(".win_container>.bg_container>.bg").css("box-shadow", "inset 0px 0px 60px 5px rgba(" + ct_color + ",0.8)");
                $(".win_container>.bg_container>.text").css("color", " rgb(255,255,255)");
            } else if (gameside == "t") {
                //$(".win_container > .chicken").css("background-image", "url(/files/img/hud_elements/win_t_chicken.png)");
                $(".win_container > .chicken").css("background-image", "url(../../files/img/round_win/t.png)");
                $(".win_container>.bg_container>.bg").css("border", "solid 3px rgb(" + t_color + ")");
                $(".win_container>.bg_container>.bg").css("box-shadow", "inset 0px 0px 60px 5px  rgba(" + t_color + ",0.8)");
                $(".win_container>.bg_container>.text").css("color", " rgb(255,255,255)");
            }

            $(".win_container > .chicken").css("display", "block").css("animation", "chickenIn 0.4s ease-out forwards");
            $(".win_container > .bg_container").css("width", "500px").css("transition", "width 0.3s ease-in 0.3s");
            $(".win_container > .bg_container > .text").text(name + " WINS!");
            $(".win_container > .bg_container > .text").css("transform", "translateY(0px)").css("transition", "transform 0.4s ease-out 0.6s");


        }

        function stopAnimationWinner() {

            $(".win_container > .chicken").css("animation", "chickenOut 0.4s ease-out forwards");
            $(".win_container > .bg_container").css("width", "0px").css("transition", "width 0.3s ease-in 0.3s");
            $(".win_container > .bg_container > .text").css("transform", "translateY(-50px)").css("transition", "transform 0.4s ease-out 0s");

        }

        // SHOW SPAM & FIREPOWER

        function showSpam() {
            $(".spam > .left_container").removeClass("hide_spam_left").addClass("show_spam");
            $(".spam > .right_container").removeClass("hide_spam_right").addClass("show_spam");
        }

        function hideSpam() {
            $(".spam > .left_container").removeClass("show_spam").addClass("hide_spam_left");
            $(".spam > .right_container").removeClass("show_spam").addClass("hide_spam_right");
        }

        function showGiveaway() {
            $(".giveaway").removeClass("hide_giveaway").addClass("show_giveaway");
        }

        function hideGiveaway() {
            $(".giveaway").removeClass("show_giveaway").addClass("hide_giveaway");
        }


        function showBonus() {
            $(".right_bonus").removeClass("hide_bonus_right").addClass("show_bonus");
            $(".left_bonus").removeClass("hide_bonus_left").addClass("show_bonus");
        }

        function hideBonus() {
            $(".right_bonus").removeClass("show_bonus").addClass("hide_bonus_right");
            $(".left_bonus").removeClass("show_bonus").addClass("hide_bonus_left");
        }


        function showPickem() {
            $(".map_picks").removeClass("hide_pickem").addClass("show_pickem");
        }

        function hidePickem() {
            $(".map_picks").removeClass("show_pickem").addClass("hide_pickem");
        }

        function showPickem_1() {
            $(".map_picks>.first_map").removeClass("hide_pickem_1").addClass("show_pickem_1");
        }

        function hidePickem_1() {
            $(".map_picks>.first_map").removeClass("show_pickem_1").addClass("hide_pickem_1");
        }

        function showPickem_2() {
            $(".map_picks>.second_map").removeClass("hide_pickem_2").addClass("show_pickem_2");
        }

        function hidePickem_2() {
            $(".map_picks>.second_map").removeClass("show_pickem_2").addClass("hide_pickem_2");
        }

        function showFirePower() {
            $(".firepower").removeClass("hide_firepower").addClass("show_firepower");
            $(".firepower_money_right").removeClass("hide_firepower_money").addClass("show_firepower_money");
            $(".firepower_money_left").removeClass("hide_firepower_money").addClass("show_firepower_money");
            if (flag == 0) {
                $(".round_winner").removeClass("hide_round_winner").addClass("show_round_winner");
            }
            $(".round_history").removeClass("hide_history").addClass("show_history");
        }

        function hideFirePower() {
            $(".firepower").removeClass("show_firepower").addClass("hide_firepower");
            $(".firepower_money_right").removeClass("show_firepower_money").addClass("hide_firepower_money");
            $(".firepower_money_left").removeClass("show_firepower_money").addClass("hide_firepower_money");
            if (flag == 0) {
                $(".round_winner").removeClass("show_round_winner").addClass("hide_round_winner");
            }
            $(".round_history").addClass("hide_history").removeClass("show_history");
        }






        if (map.phase == "intermission" || map.phase == "warmup" || map.phase == "gameover") {
            stopAnimationWinner();
        }

        if (round.phase == "over") {
            if (phase.phase_ends_in > 1) {

                if (win == rightside) {
                    startAnimationWinner("right", teams.right.name, teams.right.side);
                } else if (win == leftside) {
                    startAnimationWinner("left", teams.left.name, teams.left.side);
                }
            } else {
                stopAnimationWinner();
            }

        } else {
            stopAnimationWinner();
        }


        if (phase.phase == "freezetime") {

            stopAnimationWinner();

            if (phase.phase_ends_in > 1) {
                showSpam();
                showBonus();
                if (bo == 1) {
                    showPickem();
                    $(".map_picks>.first_map").css("opacity", "0");
                    $(".map_picks>.second_map").css("opacity", "0");
                } else if (bo == 3) {
                    showPickem_1();
                    showPickem_2();
                    showPickem();
                }
                showFirePower();
                hideGiveaway();
            } else {
                showSpam();
                hideBonus();
                if (bo == 1) {
                    hidePickem();
                } else if (bo == 3) {
                    hidePickem_1();
                    hidePickem_2();
                    hidePickem();
                }
                if ((round_now % 3) == 0) {
                    showGiveaway();
                }
                hideFirePower();
            }

        }

        if (phase.phase == "live" && phase.phase !== "bomb") {
            if (phase.phase_ends_in > 104) {
                if ($(".spam > .left_container").css("opacity") == 0 && $(".spam > .right_container").css("opacity") == 0) {
                    showSpam();
                    showGiveaway();
                }
            } else {
                if ($(".spam > .left_container").css("opacity") == 1 && $(".spam > .right_container").css("opacity") == 1) {
                    hideGiveaway();
                    hideSpam();
                }
            }
        }



        if (phase.phase == "bomb" && bomb_time > "30") {
            showSpam();
        } else if (phase.phase == "bomb" && phase.phase_ends_in < 30 && ($(".spam > .left_container").css("opacity") == 1 && $(".spam > .right_container").css("opacity") == 1)) {
            hideSpam();
        }

        if (phase.phase == "over") {
            hideSpam();
        }

        var pause_now_left = 4 - teams.left.timeouts;
        var pause_now_right = 4 - teams.right.timeouts;

        // Update Timer

        if (phase.phase_ends_in) {

            function startAnimationPause(remaining, side) {

                hideFirePower();

                var progress_width = phase.phase_ends_in * 100 / 30 + "%";

                if (phase.phase_ends_in < 0.2) {
                    stopAnimationPause();
                }

                $(".time").text(count_minute + ":" + count_seconds);
                $(".alerts_container > ." + side + " > .player").html(4 - pause_now_left + " REMAINING");
                $(".alerts_container > ." + side + " > .text").html("TATICAL PAUSE");
                $(".alerts_container > ." + side).css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                $(".alerts_container > ." + side + " > .progress").css("width", progress_width).css("transition", "all 0.5s ease-out 0s");
                $(".alerts_container > ." + side + " > .progress_2").css("width", progress_width).css("transition", "all 0.5s ease-out 0s");
                $(".alerts_container > ." + side + " > .icon").css('background-image', 'url("/files/img/hud_elements/alerts/pause.png")');
            }

            function stopAnimationPause() {


                setTimeout(function() {
                    if ($(".alerts_container > .left > .text").text() == "TATICAL PAUSE") {
                        $(".alerts_container > .left").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, -70px)");
                        $(".alerts_container > .left > .progress").css("transition", "all 0.0s ease-out 0.5s").css("width", "0%");
                        $(".alerts_container > .left > .progress_2").css("transition", "all 0.0s ease-out 0.5s").css("width", "0%");
                    }
                    if ($(".alerts_container > .right > .text").text() == "TATICAL PAUSE") {
                        $(".alerts_container > .right").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, -70px)");
                        $(".alerts_container > .right > .progress").css("transition", "all 0.0s ease-out 0.5s").css("width", "0%");
                        $(".alerts_container > .right > .progress_2").css("transition", "all 0.0s ease-out 0.5s").css("width", "0%");
                    }
                }, 700);

            }

            var countdown = Math.abs(Math.ceil(phase.phase_ends_in));
            var count_minute = Math.floor(countdown / 60);
            var count_seconds = countdown - (count_minute * 60);
            if (count_seconds < 10) {
                count_seconds = "0" + count_seconds;
            }
            //
            if (phase.phase == "bomb" && bomb_time > "9" || phase.phase == "defuse") {
                $(".Top_Bar>.Timer_BG>.Timer").html("<font size='20px'>BOMB </font>" + Math.round(bomb_time, -2));
                $(".Progress_Bar>.Center_Bar>.Center_Txt").html("BOMB PLANTED");
                var progressbomb_time = bomb_time * 100 / 40 + "%";
                if (teams.left.side == "t") {
                    $(".Progress_Bar>.Left_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                    $(".Progress_Bar>.Left_Team>.Progress").css("width", progressbomb_time).css("transition", "all 0.5s ease-out 0s");
                    $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                    $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                } else {
                    $(".Progress_Bar>.Right_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                    $(".Progress_Bar>.Right_Team>.Progress").css("width", progressbomb_time).css("transition", "all 0.5s ease-out 0s");
                    $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                    $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                }

            } else if (phase.phase == "bomb" && bomb_time <= "9.99999" && bomb_time >= "0") {
                $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                $(".Top_Bar>.Timer_BG>.Timer").html("<font size='20px'>BOMB </font>" + Math.round(bomb_time, -2));
                var progressbomb_time = bomb_time * 100 / 40 + "%";
                $(".Progress_Bar>.Center_Bar>.Center_Txt").html("BOMB PLANTED");
                if (teams.left.side == "t") {
                    $(".Progress_Bar>.Left_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                    $(".Progress_Bar>.Left_Team>.Progress").css("width", progressbomb_time).css("transition", "all 0.5s ease-out 0s");
                    $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                    $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                } else {
                    $(".Progress_Bar>.Right_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                    $(".Progress_Bar>.Right_Team>.Progress").css("width", progressbomb_time).css("transition", "all 0.5s ease-out 0s");
                    $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                    $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                }

            } else if (phase.phase == "paused" || phase.phase == "timeout_ct" || phase.phase == "timeout_t") {
                stopAnimationWinner();
                if (phase.phase == "timeout_ct" || phase.phase == "timeout_t") {
                    if (phase.phase == "timeout_ct") {
                        if (teams.left.side == "ct") {
                            startAnimationPause(pause_now_left, "left");
                        } else if (teams.right.side == "ct") {
                            startAnimationPause(pause_now_right, "right");
                        }
                    } else if (phase.phase == "timeout_t") {
                        if (teams.left.side == "t") {
                            startAnimationPause(pause_now_left, "left");
                        } else if (teams.right.side == "t") {
                            startAnimationPause(pause_now_right, "right");
                        }
                    }
                } else {
                    $(".Top_Bar>.Timer_BG>.Timer").text("PAUSE").css("font-size", "60px");
                    $(".Top_Bar>.Timer_BG>.Timer").css("color", "rgb(" + warning + ")");
                    stopAnimationPause();
                    stopAnimationWinner();
                    //hideFirePower();
                    hideBonus();
                    showGiveaway();
                }
            } else {

                $(".Top_Bar>.Timer_BG>.Timer").text(count_minute + ":" + count_seconds).css("font-size", "60px");
                $(".Top_Bar>.Timer_BG>.Timer").css("color", "rgb(236,236,236)");

                if (phase.phase != "bomb" || !data.info.bomb.state == "planting") {
                    $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                    $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                    $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                }

                if (phase.phase != "bomb" || !data.info.bomb.state == "planting") {
                    if (teams.left.side == "t") {
                        $(".Progress_Bar>.Left_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                        $(".Progress_Bar>.Left_Team>.Progress").css("width", "0%").css("transition", "all 0.5s ease-out 0s");
                    } else {
                        $(".Progress_Bar>.Right_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                        $(".Progress_Bar>.Right_Team>.Progress").css("width", "0%").css("transition", "all 0.5s ease-out 0s");
                    }
                    if (teams.left.side == "ct") {
                        $(".Progress_Bar>.Left_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                        $(".Progress_Bar>.Left_Team>.Progress").css("width", "0%").css("transition", "all 0.5s ease-out 0s");
                    } else {
                        $(".Progress_Bar>.Right_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                        $(".Progress_Bar>.Right_Team>.Progress").css("width", "0%").css("transition", "all 0.5s ease-out 0s");
                    }
                }

                if (map.phase == "warmup") {
                    $(".Top_Bar>.Timer_BG>.Timer").css("font-size", "60px");
                    $(".Top_Bar>.Timer_BG>.Timer").text("WARMUP");
                    stopAnimationPause();
                    stopAnimationWinner();
                }
                //hideGiveaway();
            }

        }

    }
    freezetime = round.phase == "freezetime";
    last_round = round_now;



}