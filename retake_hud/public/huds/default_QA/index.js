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

var warning = "207, 255, 62";


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
    $(".Spectate_Container>.Spectare_Bar>#armor").html("");

    $playeractive.find(".separator").css("opacity", "1");

    if (player.team == "CT" && teams.left.side == "ct") {
        $(".Spectate_Container>.Spectate_Bar").css("background-image", "url(../../files/img/hud_elements/Texture_Fluid_CT_v2.png)")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate_Background").css("background-color", "rgba(" + ct_color + ",0.2)");
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate").css("background-color", "rgb(" + ct_color + ")");

        $(".Spectate_Container > .Spectate_Bar > .Health_Spectate_BG > .Health_Spectate").html("" + statistics.health + "")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate").css("width", ((97 * statistics.health) / 100) + "%");
        $(".Spectate_Container>.Spectate_Bar>.Ammo_Spectate_BG>.Ammo_Bar_Spectate_Background").css("background-color", "rgba(" + ct_color + ",0.2)");


    } else if (player.team == "CT" && teams.right.side == "ct") {
        $(".Spectate_Container>.Spectate_Bar").css("background-image", "url(../../files/img/hud_elements/Texture_Fluid_CT_v2.png)")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate_Background").css("background-color", "rgb(" + ct_color + ",0.2)");
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate ").css("background-color", "rgb(" + ct_color + ")");


        $(".Spectate_Container > .Spectate_Bar > .Health_Spectate_BG > .Health_Spectate").html("" + statistics.health + "")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate").css("width", ((97 * statistics.health) / 100) + "%");
        $(".Spectate_Container>.Spectate_Bar>.Ammo_Spectate_BG>.Ammo_Bar_Spectate_Background").css("background-color", "rgb(" + ct_color + ",0.2)");


    } else if (player.team == "T" && teams.left.side == "t") {
        $(".Spectate_Container>.Spectate_Bar").css("background-image", "url(../../files/img/hud_elements/Texture_Fluid_T_v2.png)")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate_Background").css("background-color", "rgba(" + t_color + ",0.2)");
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate").css("background-color", "rgb(" + t_color + ")");

        $(".Spectate_Container > .Spectate_Bar > .Health_Spectate_BG > .Health_Spectate").html("" + statistics.health + "")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate").css("width", ((97 * statistics.health) / 100) + "%");
        $(".Spectate_Container>.Spectate_Bar>.Ammo_Spectate_BG>.Ammo_Bar_Spectate_Background").css("background-color", "rgba(" + t_color + ",0.2)");


    } else if (player.team == "T" && teams.right.side == "t") {
        $(".Spectate_Container>.Spectate_Bar").css("background-image", "url(../../files/img/hud_elements/Texture_Fluid_T_v2.png)")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate_Background").css("background-color", "rgba(" + t_color + ",0.2)");
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate ").css("background-color", "rgb(" + t_color + ")");

        $(".Spectate_Container > .Spectate_Bar > .Health_Spectate_BG > .Health_Spectate").html("" + statistics.health + "")
        $(".Spectate_Container>.Spectate_Bar>.Health_Spectate_BG>.Health_Bar_Spectate").css("width", ((97 * statistics.health) / 100) + "%");
        $(".Spectate_Container>.Spectate_Bar>.Ammo_Spectate_BG>.Ammo_Bar_Spectate_Background").css("background-color", "rgba(" + t_color + ",0.2)");

    }

    $(".Spectate_Container>.Spectate_Bar>#utility").html("");
    $(".Spectate_Container>.Spectate_Bar>#armor").html("");

    for (let key in weapons) {
        let weapon = weapons[key];
        if (weapon.type == "Grenade") {
            for (let x = 0; x < weapon.ammo_reserve; x++) {
                $(".Spectate_Container>.Spectate_Bar>#utility").append($("<img />").attr("src", "/files/img/grenades/" + weapon.name + ".png"));
            }
        }
        if (weapon.state == "active" || weapon.state == "reloading") {
            if (weapon.type == "Grenade" || weapon.type == "C4" || weapon.type == "Knife" || statistics.health == 0) {
                $(".Spectate_Container>.Spectate_Bar>.Ammo_Spectate_BG>.Ammo_Spectate").html("");
            } else {
                $(".Spectate_Container>.Spectate_Bar>.Ammo_Spectate_BG>.Ammo_Spectate").html(weapon.ammo_clip + "/" + weapon.ammo_reserve + "");
            }
        }
        if (weapon.type == "C4") {
            $(".Spectate_Container>.Spectate_Bar>#armor").append($("<img />").attr("src", "../../files/img/Icons/Icons/Equipment_Bomb.png"));
        }


    }
    if (statistics.defusekit) {
        $(".Spectate_Container>.Spectate_Bar>#armor").append($("<img />").attr("src", "../../files/img/Icons/Icons/Equipment_Defuse.png"));
    }
    if (statistics.armor) {
        $(".Spectate_Container>.Spectate_Bar>#armor").append($("<img />").attr("src", "../../files/img/Icons/Icons/Equipment_Shield.png"));
    }
    if (statistics.armor && statistics.helmet) {
        $(".Spectate_Container>.Spectate_Bar>#armor").append($("<img style='transform: scaleX(-1) ;width:23px ; height:23px; margin-top: 1px'/>").attr("src", "../../files/img/Icons/Icons/Equipment_Helmet.png"));
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

                left_team_value = l_team_value;
                l_team_value = 0;
                l_alive = 0;
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


        $(".Spam_A>.Spam_BG>.Bottom_Spam>.HE>.HE_Txt").html("x" + l_grenade);
        $(".Spam_A>.Spam_BG>.Bottom_Spam>.Smoke>.Smoke_Txt").html("x" + l_smoke);
        $(".Spam_A>.Spam_BG>.Bottom_Spam>.Inc>.Inc_Txt").html("x" + l_molo);
        $(".Spam_A>.Spam_BG>.Bottom_Spam>.Flash>.Flash_Txt").html("x" + l_flash);

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

        $(".Spam_B>.Spam_BG>.Bottom_Spam>.HE>.HE_Txt").html("x" + r_grenade);
        $(".Spam_B>.Spam_BG>.Bottom_Spam>.Smoke>.Smoke_Txt").html("x" + r_smoke);
        $(".Spam_B>.Spam_BG>.Bottom_Spam>.Inc>.Inc_Txt").html("x" + r_molo);
        $(".Spam_B>.Spam_BG>.Bottom_Spam>.Flash>.Flash_Txt").html("x" + r_flash);


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
            $(".Top_Bar>.Team_B>.BO5_B").find(".block").css("border-color", "rgb(" + ct_color + ")");
            $(".Top_Bar>.Team_B>.BO5_B").find(".win").css("background", "rgb(" + ct_color + ")");
            $(".Top_Bar>.Team_B>.BO5_B").find(".bo1block").css("border-color", "rgb(" + ct_color + ")");
            $(".Top_Bar>.Team_B>.BO5_B").find(".win1").css("background", "rgb(" + ct_color + ")");
            $(".players_right_container>.player_container").css("background-image", "url(../../files/img/hud_elements/back.png)");
        } else {
            $(".Top_Bar>.Team_B>.BO5_B").find(".block").css("border-color", "rgb(" + t_color + ")");
            $(".Top_Bar>.Team_B>.BO5_B").find(".win").css("background", "rgb(" + t_color + ")");
            $(".Top_Bar>.Team_B>.BO5_B").find(".bo1block").css("border-color", "rgb(" + t_color + ")");
            $(".Top_Bar>.Team_B>.BO5_B").find(".win1").css("background", "rgb(" + t_color + ")");
            $(".players_right_container>.player_container").css("background-image", "url(../../files/img/hud_elements/back.png)");
        }
    }

    if (side == "left") {
        if (team == "ct") {
            $(".Top_Bar>.Team_A>.BO5_A").find(".block").css("border-color", "rgb(" + ct_color + ")");
            $(".Top_Bar>.Team_A>.BO5_A").find(".win").css("background", "rgb(" + ct_color + ")");
            $(".Top_Bar>.Team_A>.BO5_A").find(".bo1block").css("border-color", "rgb(" + ct_color + ")");
            $(".Top_Bar>.Team_A>.BO5_A").find(".win1").css("background", "rgb(" + ct_color + ")");
            $(".players_left_container>.player_container").css("background-image", "url(../../files/img/hud_elements/back.png)");
        } else {
            $(".Top_Bar>.Team_A>.BO5_A").find(".block").css("border-color", "rgb(" + t_color + ")");
            $(".Top_Bar>.Team_A>.BO5_A").find(".win").css("background", "rgb(" + t_color + ")");
            $(".Top_Bar>.Team_A>.BO5_A").find(".bo1block").css("border-color", "rgb(" + t_color + ")");
            $(".Top_Bar>.Team_A>.BO5_A").find(".win1").css("background", "rgb(" + t_color + ")");
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
        /* Para fazer flash */

        if (statistics.health == 0) {
            var flash_amount = 0;
        } else {
            var flash_amount = (statistics.flashed * 0.9 / 255);
        }
        $player.find(".Flash").css("background", "rgba(255,255,255," + flash_amount + ")");

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

        if (statistics.health == 0) {
            var flash_amount = 0;
        } else {
            var flash_amount = (statistics.flashed * 0.9 / 255);
        }
        $player.find(".Flash").css("background", "rgba(255,255,255," + flash_amount + ")");

        /*
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


        if (statistics.health == 0) {
            var flash_amount = 0;
            0
        } else {
            var flash_amount = (statistics.flashed * 0.9 / 255);
        }
        $player.find(".Flash").css("background", "rgba(255,255,255," + flash_amount + ")");
        /*
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
        $player.find(".Defuse_Bomb_Icon").css("opacity", "1");
        $player.find(".Defuse_Bomb_Icon").css("background-image", "url(../../files/img/Icons/Icons/Equipment_Defuse.png)");
    } else {
        $player.find(".Defuse_Bomb_Icon").css("opacity", "0");
    }
    if (statistics.armor) {
        $player.find(".Health_Bar>.Shield_Icon").css("opacity", "1");
    } else {
        $player.find(".Health_Bar>.Shield_Icon").css("opacity", "0");
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
        if (type == "C4") {
            $player.find(".defuse_bomb_icon").css("opacity", "1");
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
        var right_bl = $("<div'></div>");
        for (var x = 0; x < (matchup == "bo5" ? 3 : 2); x++) {
            block.clone().appendTo($(left_bl)).addClass(match.team_1.map_score > x ? "win" : "");
            block.clone().appendTo($(right_bl)).addClass(match.team_2.map_score > x ? "win" : "");
        }

        $(".Top_Bar>.Team_A>.BO5_A").html(left_bl);
        $(".Top_Bar>.Team_B>.BO5_B").html(right_bl);

        $(".block").css("display", "-webkit-inline-box");
        $("#ticker_text").text("BEST OF " + matchup.substr(2));

    } else {

        $("#ticker_text").html(ticker_text);
        $(".block").css("display", "none");

        var block = $("<div class='bo1block'></div>");
        var left_bl = $("<div></div>");
        var right_bl = $("<div></div>");
        block.clone().appendTo($(left_bl));
        block.clone().appendTo($(right_bl));

        $(".Top_Bar>.Team_A>.BO5_A").html(left_bl);
        $(".Top_Bar>.Team_B>.BO5_B").html(right_bl);


        $(".bo1block").css("display", "-webkit-inline-box");

    }
    // Important
    if (observed.steamid == 1 || !observed) {
        $(".Spectate_Container>.Spectate_Bar").removeClass("observed_tr").addClass("not_observed_tr");
    } else if (observed) {
        menu = (data.info.player.activity == "menu");
        $(".Spectate_container>.Spectate_Bar").removeClass("not_observed_tr").addClass("observed_tr");
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

        $(".Firepower>.Firepower_BG>.Bar_Firepower_A ").css("width", left_percentage + "%");
        $(".Firepower>.Firepower_BG>.Bar_Firepower_B").css("width", right_percentage + "%");

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
        $(".Top_Bar>.Team_A>.Logo_Team_A_BG").css("scaleX", "1");
        $(".Top_Bar>.Team_B>.Logo_Team_B_BG").css("background-image", "url(../../files/img/hud_elements/Logo_Team_A_Noise.png)");
        $(".Top_Bar>.Team_B>.Logo_Team_B_BG").css("scaleX", "1");
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

    $(".Loss_Bonus_B>.Loss_Bonus_BG>.Top_Loss").css("background", "rgb(" + right_color + ")");
    $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_1").css("border", "solid 2px rgb(" + right_color + ")");
    $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_2").css("border", "solid 2px rgb(" + right_color + ")");
    $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_3").css("border", "solid 2px rgb(" + right_color + ")");
    $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_4").css("border", "solid 2px rgb(" + right_color + ")");


    if (loss_bonus_right == 0) {
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_1").css("background", "rgba(255,255,255 , 0)");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_2").css("background", "rgba(255,255,255 , 0)");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_3").css("background", "rgba(255,255,255 , 0)");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_4").css("background", "rgba(255,255,255 , 0)");
    } else if (loss_bonus_right == 1) {
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_1").css("background", "rgb(" + right_color + ")");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_2").css("background", "rgba(255,255,255 , 0)");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_3").css("background", "rgba(255,255,255 , 0)");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_4").css("background", "rgba(255,255,255 , 0)");

    } else if (loss_bonus_right == 2) {
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_1").css("background", "rgb(" + right_color + ")");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_2").css("background", "rgb(" + right_color + ")");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_3").css("background", "rgba(255,255,255 , 0)");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_4").css("background", "rgba(255,255,255 , 0)");

    } else if (loss_bonus_right == 3) {
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_1").css("background", "rgb(" + right_color + ")");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_2").css("background", "rgb(" + right_color + ")");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_3").css("background", "rgb(" + right_color + ")");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_4").css("background", "rgba(255,255,255 , 0)");
    } else {
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_1").css("background", "rgb(" + right_color + ")");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_2").css("background", "rgb(" + right_color + ")");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_3").css("background", "rgb(" + right_color + ")");
        $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Box_4").css("background", "rgb(" + right_color + ")");
    }
    $(".Loss_Bonus_B>.Loss_Bonus_BG>.Bottom_Loss>.Loss_Txt").html("$" + money_bonus_right);


    $(".Loss_Bonus_A>.Loss_Bonus_BG>.Top_Loss").css("background", "rgba(" + left_color + ", 0.8)");

    $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_1").css("border", "solid 2px rgb(" + left_color + ")");
    $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_2").css("border", "solid 2px rgb(" + left_color + ")");
    $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_3").css("border", "solid 2px rgb(" + left_color + ")");
    $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_4").css("border", "solid 2px rgb(" + left_color + ")");


    if (loss_bonus_left == 0) {
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_1").css("background", "rgba(255,255,255,0)");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_2").css("background", "rgba(255,255,255,0)");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_3").css("background", "rgba(255,255,255,0)");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_4").css("background", "rgba(255,255,255,0)");
    } else if (loss_bonus_left == 1) {
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_1").css("background", "rgb(" + left_color + ")");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_2").css("background", "rgba(255,255,255,0)");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_3").css("background", "rgba(255,255,255,0)");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_4").css("background", "rgba(255,255,255,0)");
    } else if (loss_bonus_left == 2) {
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_1").css("background", "rgb(" + left_color + ")");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_2").css("background", "rgb(" + left_color + ")");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_3").css("background", "rgba(255,255,25,0)");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_4").css("background", "rgba(255,255,255,0)");

    } else if (loss_bonus_left == 3) {
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_1").css("background", "rgb(" + left_color + ")");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_2").css("background", "rgb(" + left_color + ")");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_3").css("background", "rgb(" + left_color + ")");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_4").css("background", "rgba(255,255,255,0)");

    } else {
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_1").css("background", "rgba(" + left_color + ", 0.8)");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_2").css("background", "rgba(" + left_color + ", 0.8)");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_3").css("background", "rgba(" + left_color + ", 0.8)");
        $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Box_4").css("background", "rgba(" + left_color + ", 0.8)");
    }

    $(".Loss_Bonus_A>.Loss_Bonus_BG>.Bottom_Loss>.Loss_Txt").html("$" + money_bonus_left);

    /* LOSS BONUS FINITO*/

    /* EQUIPMENT MONEY START*/

    $(".Equipment_B>.Equipment_BG>.True_Equip_Money>.Money_Txt").css("color", "rgb(" + right_color + ")");
    $(".Equipment_B>.Equipment_BG>.True_Team_Money>.Money_Txt").css("color", "rgb(" + right_color + ")");
    $(".Equipment_A>.Equipment_BG>.True_Equip_Money>.Money_Txt").css("color", "rgb(" + left_color + ")");
    $(".Equipment_A>.Equipment_BG>.True_Team_Money>.Money_Txt").css("color", "rgb(" + left_color + ")");

    $(".Equipment_B>.Equipment_BG>.True_Team_Money>.Money_Txt").html("$ " + right_team_value);
    $(".Equipment_B>.Equipment_BG>.True_Equip_Money>.Money_Txt").html("$ " + right.equip_value);
    $(".Equipment_A>.Equipment_BG>.True_Team_Money>.Money_Txt").html("$ " + left_team_value);
    $(".Equipment_A>.Equipment_BG>.True_Equip_Money>.Money_Txt").html("$ " + left.equip_value);


    /* EQUIPMENT MONEY FINITO*/
    for (i = 0; i <= 15; i++) {
        $(".Game_History>.History_Bar>.Left_Team>.Round_n" + i + ">.Result").css("background-image", "url(../../files/img/History/dot.png)");
        $(".Game_History>.History_Bar>.Right_Team>.Round_n" + i + ">.Result").css("background-image", "url(../../files/img/History/dot.png)");
    }

    var total_rounds = teams.left.score + teams.right.score;
    var total = total_rounds + 1;
    if (result.length < 15) {
        $(".Game_History>.History_Text>.Text").html("GAME HISTORY - 1<sup>ST</sup> HALF");
    } else {
        $(".Game_History>.History_Text>.Text").html("GAME HISTORY - 2<sup>ND</sup> HALF");
    }




    var flag = 0;
    var z = 0;
    for (i = 0; i < result.length; i++) {
        if (total_rounds < 15) {
            nr = i + 1;
            if (nr < 15) {
                if (round_wins[nr].startsWith('ct_')) {
                    if (round_wins[nr].startsWith('ct_win_elimination')) {
                        $(".Game_History>.History_Bar>.Left_Team>.Round_n" + nr + ">.Result").css("background-image", "url(../../files/img/History/ct_death.png)");
                    } else if (round_wins[nr].startsWith('ct_win_defuse')) {
                        $(".Game_History>.History_Bar>.Left_Team>.Round_n" + nr + ">.Result").css("background-image", "url(../../files/img/History/ct_defuse.png)");
                    } else if (round_wins[nr].startsWith('ct_win_time')) {
                        $(".Game_History>.History_Bar>.Left_Team>.Round_n" + nr + ">.Result").css("background-image", "url(../../files/img/History/ct_time.png)");
                    }
                } else {
                    $(".Game_History>.History_Bar>.Left_Team>.Round_n" + nr + ">.Result").css("background-image", "none");
                }

                if (round_wins[nr].startsWith('t_')) {
                    if (round_wins[nr].startsWith('t_win_elimination')) {
                        $(".Game_History>.History_Bar>.Right_Team>.Round_n" + nr + ">.Result").css("background-image", "url(../../files/img/History/t_death.png)");
                    } else if (round_wins[nr].startsWith('t_win_bomb')) {
                        $(".Game_History>.History_Bar>.Right_Team>.Round_n" + nr + ">.Result").css("background-image", "url(../../files/img/History/t_bomb.png)");
                    }
                } else {
                    $(".Game_History>.History_Bar>.Right_Team>.Round_n" + nr + ">.Result").css("background-image", "none");
                }
            }
        } else if (total_rounds <= 30) {
            nr = i + 1;
            z = nr - 15;
            if (nr >= 15) {
                if (round_wins[nr].startsWith('ct_')) {
                    if (round_wins[nr].startsWith('ct_win_elimination')) {
                        $(".Game_History>.History_Bar>.Right_Team>.Round_n" + z + ">.Result").css("background-image", "url(../../files/img/History/ct_death.png)");
                    } else if (round_wins[nr].startsWith('ct_win_defuse')) {
                        $(".Game_History>.History_Bar>.Right_Team>.Round_n" + z + ">.Result").css("background-image", "url(../../files/img/History/ct_defuse.png)");
                    } else if (round_wins[nr].startsWith('ct_win_time')) {
                        $(".Game_History>.History_Bar>.Right_Team>.Round_n" + z + ">.Result").css("background-image", "url(../../files/img/History/ct_time.png)");
                    }
                } else {
                    $(".Game_History>.History_Bar>.Right_Team>.Round_n" + z + ">.Result").css("background-image", "none");
                }

                if (round_wins[nr].startsWith('t_')) {
                    $(".round_winner>.team_left_" + nr).css("box-shadow", "inset 0 -15px 13px  rgba(" + t_color + ",0.8)");
                    if (round_wins[nr].startsWith('t_win_elimination')) {
                        $(".Game_History>.History_Bar>.Left_Team>.Round_n" + z + ">.Result").css("background-image", "url(../../files/img/History/t_death.png)");
                    } else if (round_wins[nr].startsWith('t_win_bomb')) {
                        $(".Game_History>.History_Bar>.Left_Team>.Round_n" + z + ">.Result").css("background-image", "url(../../files/img/History/t_bomb.png)");
                    }
                } else {
                    $(".Game_History>.History_Bar>.Left_Team>.Round_n" + z + ">.Result").css("background-image", "none");
                }
            }
        } else if (total_rounds > 31) {
            console.log("paso");
            $(".Game_History>.History_Text").css("opacity", "0");
            $(".Game_History>.History_Bar").css("opacity", "0");
        }
    }


    $(".Top_Bar>.Team_A>.BO5").css("background-color", "rgb(" + left_color + ")");
    // $(".Top_Bar>.Team_A>.BO5_A>.Game_1_Team_A").css("background-color", "rgb(" + left_color + ")");
    // //$(".Top_Bar>.Team_A>.BO5_A>.Game_2_Team_A").css("background-color", "rgb(" + left_color + ")");

    $(".Top_Bar>.Team_B>.BO5").css("background-color", "rgb(" + right_color + ")");
    // $(".Top_Bar>.Team_B>.BO5_B>.Game_1_Team_B").css("background-color", "rgb(" + right_color + ")");
    // //$(".Top_Bar>.Team_B>.BO5_B>.Game_2_Team_B").css("background-color", "rgb(" + right_color + ")");

    $(".Progress_Bar>.Left_Team>.Background").css("background-color", "rgb(" + left_color + ")");
    $(".Progress_Bar>.Left_Team>.Progress").css("background-color", "rgb(" + left_color + ")");

    $(".Progress_Bar>.Right_Team>.Background").css("background-color", "rgb(" + right_color + ")");
    $(".Progress_Bar>.Right_Team>.Progress").css("background-color", "rgb(" + right_color + ")");

    $(".Firepower > .Firepower_BG>.Bar_Firepower_A").css("background-color", "rgba(" + left_color + ")");
    $(".firepower > .Firepower_BG>.Bar_Firepower_B").css("background-color", "rgba(" + right_color + ")");

    $(".Spam_A>.Spam_BG>.Top_Spam").css("background-color", "rgb(" + left_color + ")");
    $(".Spam_A>.Spam_BG>.Bottom_Spam>.HE>.HE_Txt").css("color", "rgb(" + left_color + ")");
    $(".Spam_A>.Spam_BG>.Bottom_Spam>.Flash>.Flash_Txt").css("color", "rgb(" + left_color + ")");
    $(".Spam_A>.Spam_BG>.Bottom_Spam>.Smoke>.Smoke_Txt").css("color", "rgb(" + left_color + ")");
    $(".Spam_A>.Spam_BG>.Bottom_Spam>.Inc>.Inc_Txt").css("color", "rgb(" + left_color + ")");


    $(".Spam_B>.Spam_BG>.Top_Spam").css("background-color", "rgb(" + right_color + ")");
    $(".Spam_B>.Spam_BG>.Bottom_Spam>.HE>.HE_Txt").css("color", "rgb(" + right_color + ")");
    $(".Spam_B>.Spam_BG>.Bottom_Spam>.Flash>.Flash_Txt").css("color", "rgb(" + right_color + ")");
    $(".Spam_B>.Spam_BG>.Bottom_Spam>.Smoke>.Smoke_Txt").css("color", "rgb(" + right_color + ")");
    $(".Spam_B>.Spam_BG>.Bottom_Spam>.Inc>.Inc_Txt").css("color", "rgb(" + right_color + ")");

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
    */
    // GLOBAL
    //$(".header_container").css("border-image", "linear-gradient(90deg, rgb(" + left_color + ") 0%, rgb(" + left_color + ") 50%, rgb(" + right_color + ") 50%, rgb(" + right_color + ") 100%)").css("border-image-slice", "1");


    // Update Scores





    $(".Top_Bar>.Team_A>.Score_Team_A_BG>.Score_Team_A").html(teams.left.score);
    $(".Top_Bar>.Team_B>.Score_Team_B_BG>.Score_Team_B").html(teams.right.score);

    // Update Molo Spam

    if (teams.left.side == "ct") {
        $(".Spam_A > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css('background-image', 'url("../../files/img/Icons/Icons/Utility_CTMolo.png")');
        $(".Spam_A > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css("background-size", "12px");
        $(".Spam_A > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css("top", "1px");
        $(".Spam_A > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css("left", "13px");
        $(".topbar_i_counter>.player_count_left").css("background-image", "url(../../files/img/hud_elements/Score_Team_A_Noise.png)")
    } else if (teams.left.side == "t") {
        $(".Spam_A > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css('background-image', 'url("../../files/img/Icons/Icons/Utility_TMolo.png")');
        $(".Spam_A > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css("background-size", "21px");
        $(".Spam_A > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css("top", "0px");
        $(".Spam_A > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css("left", "10px");
        $(".topbar_i_counter>.player_count_left").css("background-image", "url(../../files/img/hud_elements/Score_Team_B_Noise.png)")

    }

    if (teams.right.side == "ct") {
        $(".Spam_B > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css('background-image', 'url("../../files/img/Icons/Icons/Utility_CTMolo.png")');
        $(".Spam_B > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css("background-size", "12px");
        $(".Spam_B > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css("top", "1px");
        $(".Spam_B > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css("left", "13px");
        $(".topbar_i_counter>.player_count_right").css("background-image", "url(../../files/img/hud_elements/Score_Team_A_Noise.png)")


    } else if (teams.right.side == "t") {
        $(".Spam_B > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css('background-image', 'url("../../files/img/Icons/Icons/Utility_TMolo.png")');
        $(".Spam_B > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css("background-size", "21px");
        $(".Spam_B > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css("top", "0px");
        $(".Spam_B > .Spam_BG > .Bottom_Spam > .Inc > .Inc_Icon ").css("left", "10px");
        $(".topbar_i_counter>.player_count_right").css("background-image", "url(../../files/img/hud_elements/Score_Team_B_Noise.png)")

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
        $(".Top_Bar>.Timer_BG>.Timer").css("color", (phase.phase == "live" || phase.phase == "over" || phase.phase == "warmup" || (phase.phase == "freezetime" && phase.phase_ends_in > 10)) ?
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
                progress_width = defuse_countdown * 100 / 10.0 + "%";
            } else {
                progress_width = defuse_countdown * 100 / 5.0 + "%";
            }

            if (side == "left") {
                $(".Progress_Bar>.Left_Team>.txt").css("opacity", "1");
                $(".Progress_Bar>.Left_Team>.txt").html(name);
                $(".Progress_Bar>.Left_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px,0px)");
                $(".Progress_Bar>.Left_Team>.Progress").css("width", progress_width).css("transition", "all 0.5s ease-out 0s");
                $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
            } else {
                $(".Progress_Bar>.Right_Team>.txt").css("opacity", "1");
                $(".Progress_Bar>.Right_Team>.txt").html(name);
                $(".Progress_Bar>.Right_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px,0px)");
                $(".Progress_Bar>.Right_Team>.Progress").css("width", progress_width).css("transition", "all 0.5s ease-out 0s");
                $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
            }

            if ($(".Progress_Bar").hasClass("longd")) {
                if (data.info.bomb.countdown < 9.6) {
                    $(".Progress_Bar>.Center_Bar>.Center_Txt").html("DEFUSING BOMB");
                    $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                }
            } else {
                if (data.info.bomb.countdown < 4.6) {
                    $(".Progress_Bar>.Center_Bar>.Center_Txt").html("DEFUSING BOMB");
                    $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                }
            }

        }


        function stopAnimationDefuse() {

            $(".Progress_Bar").hasClass("longd");

            setTimeout(function() {
                if ($(".Progress_Bar>.Center_Bar>.Center_Txt").text() == "DEFUSING BOMB") {
                    if (teams.left.side == "ct") {
                        $(".Progress_Bar>.Center_Bar>.Center_Txt").html("BOMB PLANTED");
                        $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                        $(".Progress_Bar>.Left_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px,0px)");
                        $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                    } else if (teams.right.side == "ct") {
                        $(".Progress_Bar>.Center_Bar>.Center_Txt").html("BOMB PLANTED");
                        $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                        $(".Progress_Bar>.Right_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px,0px)");
                        $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                    }
                }
            }, 500);
        }

        function startAnimationPlanting(name, side) {

            var countdown = parseFloat(3.2) - parseFloat(data.info.bomb.countdown);
            countdown = countdown.toFixed(1);
            var progress_width = countdown * 100 / 3 + "%";

            if (side == "left") {
                $(".Progress_Bar>.Left_Team>.txt").css("opacity", "1");
                $(".Progress_Bar>.Left_Team>.txt").html(name);
                $(".Progress_Bar>.Center_Bar>.Center_Txt").html("PLANTING BOMB");
                $(".Progress_Bar>.Left_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                $(".Progress_Bar>.Left_Team>.Progress").css("width", progress_width).css("transition", "all 0.5s ease-out 0s");
                $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");

            } else {
                $(".Progress_Bar>.Right_Team>.txt").css("opacity", "1");
                $(".Progress_Bar>.Right_Team>.txt").html(name);
                $(".Progress_Bar>.Center_Bar>.Center_Txt").html("PLANTING BOMB");
                $(".Progress_Bar>.Right_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                $(".Progress_Bar>.Right_Team>.Progress").css("width", progress_width).css("transition", "all 0.5s ease-out 0s");
                $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
            }
        }

        function stopAnimationPlanting() {

            setTimeout(function() {
                if ($(".Progress_Bar>.Center_Bar>.Center_Txt").text() == "PLANTING BOMB") {
                    if (teams.left.side == "t") {
                        $(".Progress_Bar>.Left_Team>.txt").css("opacity", "0");
                        $(".Progress_Bar>.Center_Bar>.Center_Txt").html(" ");
                        $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                        $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                    } else if (teams.right.side == "t") {
                        $(".Progress_Bar>.Right_Team>.txt").css("opacity", "0");
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
            stopAnimationPlanting();
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
                $(".win_container>.team_BG>.icon").css("background-image", "url(../../files/img/Logo_Retake.png)");
                $(".win_container>.win_BG>.true_team").html(name);
                $(".win_container>.win_BG>.background").css("background-image", "url(../../files/img/hud_elements/winner_ct.png)");
            } else if (gameside == "t") {
                $(".win_container>.team_BG>.icon").css("background-image", "url(../../files/img/Logo_Retake.png)");
                $(".win_container>.win_BG>.true_team").html(name);
                $(".win_container>.win_BG>.background").css("background-image", "url(../../files/img/hud_elements/winner_t.png)");
            }

            $(".win_container>.team_BG").css("transform", "translate(0px,0px)").css("transition", "transform 0.3s ease 0.0s");
            $(".win_container>.team_BG>.icon").css("animation", "LogoIn 0.5s ease forwards");
            $(".win_container>.win_BG").css("transform", "translate(0px,0px)").css("transition", "transform 0.3s ease 0.6s");
            $(".win_container>.win_BG>.true_team").css("transform", "translate(0px,0px)").css("transition", "transform 0.3s ease 0.8s");
            $(".win_container>.win_BG>.txt").css("transform", "translate(0px,0px)").css("transition", "transform 0.3s ease 1s");

        }

        function stopAnimationWinner() {

            $(".win_container>.win_BG>.true_team").css("transform", "translate(0px,-280px)").css("transition", "transform 0.3s ease 0s");
            $(".win_container>.win_BG>.txt").css("transform", "translate(0px,280px)").css("transition", "transform 0.3s ease 0.2s");
            $(".win_container>.win_BG").css("transform", "translate(0px,280px)").css("transition", "transform 0.3s ease 0.4s");

            $(".win_container>.team_BG>.icon").css("animation", "LogoOut 0.3s ease forwards");
            $(".win_container>.team_BG").css("transform", "translate(0px,-270px)").css("transition", "transform 0.3s ease 0.4s");

        }

        // SHOW SPAM & FIREPOWER

        function showSpam() {
            $(".Spam_A>.Spam_BG").removeClass("hide_spam_left").addClass("show_spam");
            $(".Spam_B>.Spam_BG").removeClass("hide_spam_right").addClass("show_spam");
        }

        function hideSpam() {
            $(".Spam_A>.Spam_BG").removeClass("show_spam").addClass("hide_spam_left");
            $(".Spam_B>.Spam_BG").removeClass("show_spam").addClass("hide_spam_right");
        }

        function showGiveaway() {
            $(".giveaway").removeClass("hide_giveaway").addClass("show_giveaway");
        }

        function hideGiveaway() {
            $(".giveaway").removeClass("show_giveaway").addClass("hide_giveaway");
        }

        function showBonus() {
            $(".Loss_Bonus_B>.Loss_Bonus_BG").removeClass("hide_bonus_right").addClass("show_bonus");
            $(".Loss_Bonus_A>.Loss_Bonus_BG").removeClass("hide_bonus_left").addClass("show_bonus");
        }

        function hideBonus() {
            $(".Loss_Bonus_B>.Loss_Bonus_BG").removeClass("show_bonus").addClass("hide_bonus_right");
            $(".Loss_Bonus_A>.Loss_Bonus_BG").removeClass("show_bonus").addClass("hide_bonus_left");
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
            $(".Firepower>.Firepower_BG").removeClass("hide_firepower").addClass("show_firepower");
            $(".Equipment_A>.Equipment_BG").removeClass("hide_equipment_money").addClass("show_equipment_money");
            $(".Equipment_B>.Equipment_BG").removeClass("hide_equipment_money").addClass("show_equipment_money");
            if (flag == 0) {
                $(".round_winner").removeClass("hide_round_winner").addClass("show_round_winner");
            }
            $(".Game_History").removeClass("hide_history").addClass("show_history");
        }

        function hideFirePower() {
            $(".Firepower>.Firepower_BG").removeClass("show_firepower").addClass("hide_firepower");
            $(".Equipment_A>.Equipment_BG").removeClass("show_equipment_money").addClass("hide_equipment_money");
            $(".Equipment_B>.Equipment_BG").removeClass("show_equipment_money").addClass("hide_equipment_money");
            if (flag == 0) {
                $(".round_winner").removeClass("show_round_winner").addClass("hide_round_winner");
            }
            $(".Game_History").addClass("hide_history").removeClass("show_history");
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
                if ($(".Spam_A>.Spam_BG").css("opacity") == 0 && $(".Spam_B>.Spam_BG").css("opacity") == 0) {
                    showSpam();
                    showGiveaway();
                }
            } else {
                if ($(".Spam_A>.Spam_BG").css("opacity") == 1 && $(".Spam_B>.Spam_BG").css("opacity") == 1) {
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
        var pause_now_left = (4 - teams.left.timeouts);
        var pause_now_right = (4 - teams.right.timeouts);

        // Update Timer

        if (phase.phase_ends_in) {

            function startAnimationPause(remaining, side) {

                hideFirePower();

                var progress_width = phase.phase_ends_in * 100 / 30 + "%";

                if (phase.phase_ends_in < 0.2) {
                    stopAnimationPause();
                }

                $(".Top_Bar>.Timer_BG>.Timer").text(count_minute + ":" + count_seconds);
                if (side == "left") {
                    $(".Top_Bar>.Team_A>.Top_BG>.Pause>.Pause_Text").html("tactical Pause " + pause_now_left + "/4");
                    $(".Top_Bar>.Team_A>.Top_BG>.Pause>.Pause_Txt>.Txt").html("TATICAL PAUSE");
                    $(".Top_Bar>.Team_A>.Top_BG>.Pause").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");

                } else if (side == "right") {
                    $(".Top_Bar>.Team_B>.Top_BG>.Pause>.Pause_Text").html("tactical Pause " + pause_now_left + "/4");
                    $(".Top_Bar>.Team_B>.Top_BG>.Pause>.Pause_Txt>.Txt").html("TATICAL PAUSE");
                    $(".Top_Bar>.Team_B>.Top_BG>.Pause").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                }
            }

            function stopAnimationPause(side) {


                setTimeout(function() {

                    $(".Top_Bar>.Team_A>.Top_BG>.Pause").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateX(300px)");
                    $(".Top_Bar>.Team_B>.Top_BG>.Pause").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateX(-300px)");

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
                $(".Top_Bar>.Timer_BG>.Timer").html(Math.round(bomb_time, -2));
                var progressbomb_time = bomb_time * 100 / 40 + "%";
                if (phase.phase !== "defuse") {
                    $(".Progress_Bar>.Center_Bar>.Center_Txt").html("BOMB PLANTED");
                }
                if (teams.left.side == "t") {
                    $(".Progress_Bar>.Left_Team>.txt").css("opacity", "0");
                    $(".Progress_Bar>.Left_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                    $(".Progress_Bar>.Left_Team>.Progress").css("width", progressbomb_time).css("transition", "all 0.5s ease-out 0s");
                    $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                    $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                } else if (teams.right.side == "t") {
                    $(".Progress_Bar>.Right_Team>.txt").css("opacity", "0");
                    $(".Progress_Bar>.Right_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                    $(".Progress_Bar>.Right_Team>.Progress").css("width", progressbomb_time).css("transition", "all 0.5s ease-out 0s");
                    $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                    $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                }

            } else if (phase.phase == "bomb" && bomb_time <= "9.99999" && bomb_time >= "0") {
                $(".Top_Bar>.Timer_BG>.Timer").html(Math.round(bomb_time, -2));
                if (phase.phase !== "defuse") {
                    $(".Progress_Bar>.Center_Bar>.Center_Txt").html("BOMB PLANTED");
                }
                var progressbomb_time = bomb_time * 100 / 40 + "%";
                if (teams.left.side == "t") {
                    $(".Progress_Bar>.Left_Team>.txt").css("opacity", "0");
                    $(".Progress_Bar>.Left_Team>.Progress").css("transition", "transform 0.5s ease-out 0s").css("transform", "translate(0px, 0px)");
                    $(".Progress_Bar>.Left_Team>.Progress").css("width", progressbomb_time).css("transition", "all 0.5s ease-out 0s");
                    $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                    $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(0px)");
                } else if (teams.right.side == "t") {
                    $(".Progress_Bar>.Right_Team>.txt").css("opacity", "0");
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

                if (data.info.bomb.state !== "planting") {
                    $(".Progress_Bar>.Center_Bar").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                    $(".Progress_Bar>.Left_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                    $(".Progress_Bar>.Right_Team").css("transition", "transform 0.5s ease-out 0s").css("transform", "translateY(-40px)");
                }

                if (data.info.bomb.state !== "planting") {
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