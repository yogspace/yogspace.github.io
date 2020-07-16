/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

/* imports */

// game structure classes
import Player from "./simulation/player.js";
import Game from "./simulation/game.js";

// general display classes
import DisplayObject from "./displayObject.js";
import AnimatedDisplayObject from "./animatedDisplayObject.js";
import ColorScreen from "./colorScreen.js";
import VideoElement from "./startVideo/videoElement.js";
import View from "./view.js";
import TextArea from "./textarea.js";

// interactive element classes
import InfoBox from "./titlescreen/infoBox.js";
import TitleScreenButton from "./titlescreen/titleScreenButton.js";
import BarLink from "./simulation/interactiveElements/demo/barLink.js";
import CoffeeHouseLink from "./simulation/interactiveElements/park/coffeeHouseLink.js";
import DemoLink from "./simulation/interactiveElements/park/demoLink.js";
import KioskLink from "./simulation/interactiveElements/park/kioskLink.js";
import ParkLink from "./simulation/interactiveElements/general/parkLink.js";
import DemoSign from "./simulation/interactiveElements/demo/demoSign.js";
import DemoBench from "./simulation/interactiveElements/demo/demoBench.js";
import Speechbubble from "./simulation/interactiveElements/general/speechbubble.js";
import FlyerBox from "./simulation/interactiveElements/general/flyerBox.js";
import Flyer from "./simulation/interactiveElements/general/flyer.js";
import Door from "./simulation/interactiveElements/coffeeHouse/door.js";
import PhoneIcon from "./simulation/interactiveElements/smartphone/phoneIcon.js";
import MobilePhone from "./simulation/interactiveElements/smartphone/mobilePhone.js";
import PhoneButton from "./simulation/interactiveElements/smartphone/phoneButton.js";
import PhoneMenuIcon from "./simulation/interactiveElements/smartphone/phoneMenuIcon.js";
import PhoneHomeScreen from "./simulation/interactiveElements/smartphone/phoneHomeScreen.js";
import PhonePostScreen from "./simulation/interactiveElements/smartphone/phonePostScreen.js";
import PhonePostButton from "./simulation/interactiveElements/smartphone/phonePostButton.js";
import ChoosePostButton from "./simulation/interactiveElements/smartphone/choosePostButton.js";
import PhoneMessageScreen from "./simulation/interactiveElements/smartphone/phoneMessageScreen.js";
import PhoneMessageButton from "./simulation/interactiveElements/smartphone/phoneMessageButton.js";
import PhoneEndScreen from "./simulation/interactiveElements/smartphone/phoneEndScreen.js";
import PhoneVideoPlayer from "./simulation/interactiveElements/smartphone/phoneVideoPlayer.js";
import PhoneEndButton from "./simulation/interactiveElements/smartphone/phoneEndButton.js";
import PhoneMailButton from "./simulation/interactiveElements/smartphone/phoneMailButton.js";
import MoreInfoButton from "./simulation/interactiveElements/smartphone/moreInfoButton.js";
import RestartButton from "./simulation/interactiveElements/smartphone/restartButton.js";
import StreetLampBulb from "./simulation/interactiveElements/general/streetLampBulb.js";
import BarLampBulb from "./simulation/interactiveElements/bar/barLampBulb.js";
import Kiosk from "./simulation/interactiveElements/kiosk/kiosk.js";
import Arcade from "./simulation/interactiveElements/bar/arcade.js";
import BarPhone from "./simulation/interactiveElements/bar/barPhone.js";
import DemoPeople from "./simulation/interactiveElements/demo/demoPeople.js";
import Newspaper from "./simulation/interactiveElements/kiosk/newspaper.js";
import DemoForegnd from "./simulation/interactiveElements/demo/demoForegnd.js";
import StartGameButton from "./startVideo/startGameButton.js";
import PongGame from "./simulation/interactiveElements/bar/pong/pongGame.js";
import PongStartButton from "./simulation/interactiveElements/bar/pong/pongStartButton.js";

// utillity classes
import AnimationProcessor from "./animationProcessor.js";
import KeyInput from "./keyInput.js";
import LeaveArcadeButton from "./simulation/interactiveElements/bar/pong/leaveArcadeButton.js";

// load images
let titleScreenImg;
let parkBackgnd, moonImg, cityImg, streetImg, treesImg, parkForegndImg;
let kioskTreesImg, kioskBuildingImg_on, kioskBuildingImg_off, kioskTrashcanImg, kioskSunshadeImg;
let demoBackgnd, demoForegndImg_demo, demoForegndImg_pastDemo;
let coffeeHouseBackgnd, coffeeHouseForegndImg;
let barBackgnd, barForegndImg, barArcadeImg_dark, barArcadeImg_light, barPhoneImg;

let barLinkImg, coffeeHouseLinkImg, demoLinkBarImg_on, demoLinkBarImg_off, demoLinkDemoImg_demo, demoLinkDemoImg_noDemo, demoLinkSignsLeftImg, demoLinkSignsRightImg, kioskLinkImg_on, kioskLinkImg_off, kioskLinkNewspapersImg, parkLinkImg_kiosk, parkLinkImg_demo, parkLinkImg_coffeeHouse;
let doorImg, demoSignImg, flyerBoxImg, flyerImg_coffeeHouse, flyerImg_park, streetLampBulbOnImg, streetLampBulbOffImg, demoBenchImg, newspaperImg, pongBackImg, pongStartImg;
let phoneIconImg, phoneOutlineImg, phoneOverlayImg, brokenPhoneOverlayImg, phoneBtnImg, homeIconImg, msgIconImg, postIconImg, userIconImg, journalistIconImg, conspiracyIconImg;
let postOverlayImg, postImg_demoJoined, postImg_counterDemoJoined, postImg_watchedProDemo, postImg_watchedProCounterDemo, postImg_watchedProNone, postImg_groupInvitationAccepted, postImg_groupInvitationDenied, postImg_interviewDenied, postImg_interviewDefend, postImg_interviewRevoke, postImg_11, postImg_12, postImg_13;
let demoPeopleImg_left, demoPeopleImg_right, demoPeopleSignsImg_left, demoPeopleSignsImg_right;

// load videos

let videoOverlayImg, videoSkipBtnImg;
let startVideo, endVideo, reflectiveUserVideo, wannabeInfluencerVideo, followerVideo, conspiracyTheoristVideo;

// load soundfiles
let owlSound, demoSound, citySound, leavesSound, coffeeHouseSound, coffeeHouseMusicSound, fountainSound, policeSirenSound, demoBenchSound;
let phoneMsgSound, phoneVibrationSound, phoneTapSound, doorSound, insideStepsSound_fast, insideStepsSound_slow, outsideStepsSound_fast, outsideStepsSound_slow, lampClickSound, streetsignClickSound, registerSound, newspaperSound, pickupSignSound, flyerSound, buttonSound, arcadeLeverSound;

function preload() {
  // fonts
  window.fonts = {
    rockwell: loadFont("../style/fonts/rockwell.ttf"),
    franklinGothic: loadFont("../style/fonts/franklinGothic.ttf"),
  };

  // backgnd images
  parkBackgnd = loadImage("../img/park/0_backgnd.png");
  demoBackgnd = loadImage("../img/demo/0_backgnd.png");
  coffeeHouseBackgnd = loadImage("../img/coffeeHouse/0_backgnd.png");
  barBackgnd = loadImage("../img/bar/0_backgnd.png");

  // layers
  titleScreenImg = loadImage("../img/titlescreen/titlescreenimg.png");
  moonImg = loadImage("../img/park/1_moon.png");
  cityImg = loadImage("../img/park/2_city.png");
  streetImg = loadImage("../img/park/3_street.png");
  treesImg = loadImage("../img/park/5_trees.png");
  parkForegndImg = loadImage("../img/park/6_foregnd.png");
  coffeeHouseForegndImg = loadImage("../img/coffeeHouse/1_foregnd.png");
  barForegndImg = loadImage("../img/bar/1_foregnd.png");
  demoForegndImg_demo = loadImage("../img/demo/2_foregnd_demo.png");
  demoForegndImg_pastDemo = loadImage("../img/demo/2_foregnd_past-demo.png");
  kioskTreesImg = loadImage("../img/kiosk/1_trees.png");
  kioskBuildingImg_off = loadImage("../img/kiosk/2_building_off.png");
  kioskTrashcanImg = loadImage("../img/kiosk/3_elements/3_trashcan.png");
  kioskSunshadeImg = loadImage("../img/kiosk/3_elements/3_sunshade.png");

  // interactive elements
  barLinkImg = loadImage("../img/demo/1_interactionSpaces/1_door.png");
  coffeeHouseLinkImg = loadImage("../img/park/4_interactionSpaces/4_coffeeHouse.png");
  demoLinkBarImg_on = loadImage("../img/park/4_interactionSpaces/4_demo-bar_on.png");
  demoLinkBarImg_off = loadImage("../img/park/4_interactionSpaces/4_demo-bar_off.png");
  demoLinkDemoImg_demo = loadImage("../img/park/4_interactionSpaces/4_demo-demo.png");
  demoLinkDemoImg_noDemo = loadImage("../img/park/4_interactionSpaces/4_demo-pastDemo.png");
  demoLinkSignsLeftImg = loadImage("../img/park/4_interactionSpaces/4_demo-signs-1.png");
  demoLinkSignsRightImg = loadImage("../img/park/4_interactionSpaces/4_demo-signs-2.png");
  kioskLinkImg_on = loadImage("../img/park/4_interactionSpaces/4_kiosk_open.png");
  kioskLinkImg_off = loadImage("../img/park/4_interactionSpaces/4_kiosk_closed.png");
  kioskLinkNewspapersImg = loadImage("../img/park/4_interactionSpaces/4_newspapers.png");
  parkLinkImg_kiosk = loadImage("../img/kiosk/4_interactionSpaces/4_advertisingColumn.png");
  parkLinkImg_demo = loadImage("../img/demo/1_interactionSpaces/1_park.png");
  parkLinkImg_coffeeHouse = loadImage("../img/coffeeHouse/3_interactionSpaces/3_park.png");
  demoSignImg = loadImage("../img/demo/3_elements/3_sign.png");
  demoBenchImg = loadImage("../img/demo/3_elements/3_bench.png");
  flyerBoxImg = loadImage("../img/assets/flyerbox.png");
  flyerImg_coffeeHouse = loadImage("../img/coffeeHouse/2_elements/2_flyer.png");
  flyerImg_park = loadImage("../img/park/7_flyer.png");
  newspaperImg = loadImage("../img/kiosk/3_elements/3_newspaper.png");
  streetLampBulbOnImg = loadImage("../img/assets/lamp-on.png");
  streetLampBulbOffImg = loadImage("../img/assets/lamp-off.png");
  doorImg = loadImage("../img/coffeeHouse/2_elements/2_door.png");
  kioskBuildingImg_on = loadImage("../img/kiosk/2_building_on.png");
  barArcadeImg_dark = loadImage("../img/bar/2_elements/2_arcade_dark.png");
  barArcadeImg_light = loadImage("../img/bar/2_elements/2_arcade_light.png");
  pongBackImg = loadImage("../img/bar/2_elements/2_pongBack.png");
  pongStartImg = loadImage("../img/bar/2_elements/2_pongStart.png");
  barPhoneImg = loadImage("../img/bar/2_elements/2_mobilePhone.png");

  // smartphone
  phoneIconImg = loadImage("../img/smartphone/phoneIcon.png");
  phoneOutlineImg = loadImage("../img/smartphone/phoneOutline.png");
  phoneOverlayImg = loadImage("../img/smartphone/phoneOverlay.png");
  brokenPhoneOverlayImg = loadImage("../img/smartphone/brokenPhoneOverlay.png");
  phoneBtnImg = loadImage("../img/smartphone/phoneButton.png");
  homeIconImg = loadImage("../img/smartphone/homeIcon.png");
  postIconImg = loadImage("../img/smartphone/postIcon.png");
  msgIconImg = loadImage("../img/smartphone/messageIcon.png");
  userIconImg = loadImage("../img/smartphone/userIcon.png");
  journalistIconImg = loadImage("../img/smartphone/journalistIcon.png");
  conspiracyIconImg = loadImage("../img/smartphone/conspiracyIcon.png");
  postOverlayImg = loadImage("../img/smartphone/postOverlay.png");
  postImg_demoJoined = loadImage("../img/smartphone/posts/postImg_demoJoined.png");
  postImg_counterDemoJoined = loadImage("../img/smartphone/posts/postImg_counterDemoJoined.png");
  postImg_watchedProDemo = loadImage("../img/smartphone/posts/postImg_watchedProDemo.png");
  postImg_watchedProCounterDemo = loadImage("../img/smartphone/posts/postImg_watchedProCounterDemo.png");
  postImg_watchedProNone = loadImage("../img/smartphone/posts/postImg_watchedProNone.png");
  postImg_groupInvitationAccepted = loadImage("../img/smartphone/posts/postImg_groupInvitationAccepted.png");
  postImg_groupInvitationDenied = loadImage("../img/smartphone/posts/postImg_groupInvitationDenied.png");
  postImg_interviewDenied = loadImage("../img/smartphone/posts/postImg_interviewDenied.png");
  postImg_interviewDefend = loadImage("../img/smartphone/posts/postImg_interviewDefend.png");
  postImg_interviewRevoke = loadImage("../img/smartphone/posts/postImg_interviewRevoke.png");
  // postImg_11 = loadImage("../img/smartphone/posts/post11.png");
  // postImg_12 = loadImage("../img/smartphone/posts/post12.png");
  // postImg_13 = loadImage("../img/smartphone/posts/post13.png");

  // animation elements
  demoPeopleImg_left = loadImage("../img/demo/4_people/4_people_left.png");
  demoPeopleImg_right = loadImage("../img/demo/4_people/4_people_right.png");
  demoPeopleSignsImg_left = loadImage("../img/demo/4_people/4_signs_left.png");
  demoPeopleSignsImg_right = loadImage("../img/demo/4_people/4_signs_right.png");

  // video
  videoOverlayImg = loadImage("../img/smartphone/endVideoOverlay.png");
  videoSkipBtnImg = loadImage("../img/assets/arrowBtn.png");

  startVideo = createVideo("../video/startVideo.mp4");
  startVideo.id("startVideo");
  startVideo.hide();
  reflectiveUserVideo = createVideo("../video/reflectiveUser.mp4");
  reflectiveUserVideo.id("reflectiveUserVideo");
  reflectiveUserVideo.hide();
  conspiracyTheoristVideo = createVideo("../video/conspiracyTheorist.mp4");
  conspiracyTheoristVideo.id("conspiracyTheoristVideo");
  conspiracyTheoristVideo.hide();
  followerVideo = createVideo("../video/follower.mp4");
  followerVideo.id("followerVideo");
  followerVideo.hide();
  wannabeInfluencerVideo = createVideo("../video/wannabeInfluencer.mp4");
  wannabeInfluencerVideo.id("wannabeInfluencerVideo");
  wannabeInfluencerVideo.hide();

  endVideo = [reflectiveUserVideo, conspiracyTheoristVideo, followerVideo, wannabeInfluencerVideo];

  // sound
  owlSound = loadSound("../sound/ambient/owl.mp3");
  demoSound = loadSound("../sound/ambient/demo.mp3");
  leavesSound = loadSound("../sound/ambient/leaves.mp3");
  coffeeHouseSound = loadSound("../sound/ambient/coffeeHouse.mp3");
  coffeeHouseMusicSound = loadSound("../sound/ambient/coffeeHouseMusic.mp3");
  fountainSound = loadSound("../sound/ambient/fountain.mp3");
  policeSirenSound = loadSound("../sound/ambient/policeSiren.mp3");
  phoneMsgSound = loadSound("../sound/eventRelated/phoneMsg.mp3");
  phoneVibrationSound = loadSound("../sound/eventRelated/phoneVibration.mp3");
  phoneTapSound = loadSound("../sound/eventRelated/phoneTap.mp3");
  doorSound = loadSound("../sound/eventRelated/door.mp3");
  insideStepsSound_fast = loadSound("../sound/eventRelated/insideSteps_fast.mp3");
  insideStepsSound_slow = loadSound("../sound/eventRelated/insideSteps_slow.mp3");
  outsideStepsSound_fast = loadSound("../sound/eventRelated/outsideSteps_fast.mp3");
  outsideStepsSound_slow = loadSound("../sound/eventRelated/outsideSteps_slow.mp3");
  lampClickSound = loadSound("../sound/eventRelated/lampClick.mp3");
  streetsignClickSound = loadSound("../sound/eventRelated/streetsignClick.mp3");
  registerSound = loadSound("../sound/eventRelated/register.mp3");
  newspaperSound = loadSound("../sound/eventRelated/newspaper.mp3");
  pickupSignSound = loadSound("../sound/eventRelated/pickupSign.mp3");
  flyerSound = loadSound("../sound/eventRelated/flyer.mp3");
  demoBenchSound = loadSound("../sound/eventRelated/benchSitdown.mp3");
  buttonSound = loadSound("../sound/eventRelated/button.mp3");
  arcadeLeverSound = loadSound("../sound/eventRelated/arcadeLever.mp3");
  citySound = loadSound("../sound/ambient/city.mp3");
  coffeeHouseMusicSound = loadSound("../sound/ambient/coffeeHouseMusic.mp3", setupGame);
}
window.preload = preload;

/* setup */

let keys = new KeyInput();

let player = new Player();
window.addEventListener("addAction", (ev) => {
  window.dispatchEvent(new CustomEvent(ev.detail.name, { detail: ev.detail.data }));
  player.addAction(ev.detail.origin, ev.detail.name, ev.detail.data);
});

let game = new Game(player);
window.addEventListener("enterView", (ev) => {
  animate.start("fadeOut", false, () => {
    animate.start("fadeOut", true);
  });
  setTimeout(() => {
    game.enterView(ev.detail);
  }, 1000);

  if (ev.detail === "bar") {
    phoneVibrationSound.fade(0.5, 1);
    if (!player.actionDone("bar", "playPong")) {
      doorSound.play();
      citySound.fade(0, 1);
      window.dispatchEvent(new CustomEvent("hidePhoneIcon"));
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("barPhoneVibration"));
      }, 1000);
    }
  }

  if (ev.detail === "pong") {
    phoneVibrationSound.fade(0, 1);

  }

  if (ev.detail === "demo") {
    citySound.fade(0.2, 2);
    leavesSound.fade(0, 1);
    owlSound.fade(0, 1);
    if (!player.actionDone("demo", "endDemo")) {
      window.dispatchEvent(new CustomEvent("startDemoAnimation"));
      demoSound.fade(0.2, 1);
      setTimeout(() => {
        policeSirenSound.play();
        policeSirenSound.setVolume(0.4);
        policeSirenSound.fade(0, 7.5);
      }, 1500);
    }
  }

  if (ev.detail === "kiosk") {
    demoSound.fade(0, 1);
  }

  if (ev.detail === "park") {
    citySound.fade(0.05);
    leavesSound.fade(0.3, 1);
    fountainSound.fade(0, 2);
    owlSound.fade(0.05, 1);
    demoSound.fade(0.02, 1);

    window.dispatchEvent(new CustomEvent("stoppDemoAnimation"));

    if ((player.actionDone("demo") || player.actionDone("coffeeHouse")) && !player.actionDone("kiosk")) {
      window.dispatchEvent(new CustomEvent("openKiosk"));

      let rand = floor(random(0, 3));
      let events = [
        new CustomEvent("randConspiracyTheorist"),
        new CustomEvent("randWannabeInfluencer"),
        new CustomEvent("randFollower"),
      ];
      window.dispatchEvent(events[rand]);
    }
    if (player.actionDone("kiosk")) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("hideNewspapers"));
      }, 1000);
    }
    if (player.actionDone("demo") && player.actionDone("coffeeHouse")) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("addAction", {
          detail: {
            origin: "demo",
            name: "endDemo",
            data: {},
          },
        })
        );
      }, 1000);
    }
    if (
      player.actionDone("demo") && player.actionDone("coffeeHouse") && player.actionDone("kiosk")) {
      window.dispatchEvent(new CustomEvent("friendMessage"));
    }
  }

  if (ev.detail === "coffeeHouse") {
    citySound.fade(0.1, 2);
    leavesSound.fade(0.6, 2);
    fountainSound.fade(0.06, 2);
    owlSound.fade(0, 1);
    demoSound.fade(0, 1);
    if (player.actionDone("demo", "joinDemo") && !player.actionDone("coffeeHouse", "groupInvitation")) {
      window.dispatchEvent(
        new CustomEvent("addAction", {
          detail: {
            origin: "coffeeHouse",
            name: "groupInvitation",
            data: {},
          },
        })
      );
    }
  }
});

let animate = new AnimationProcessor(30);

function setupGame() {
  // views
  let titleScreen = new View("titlescreen", 1935, 768);
  game.addView(titleScreen);
  game.enterView("titlescreen");

  let startVideoScreen = new View("startVideo", windowWidth, windowHeight);
  game.addView(startVideoScreen);

  let park = new View("park", 4098, 768, parkBackgnd);
  game.addView(park);

  let kiosk = new View("kiosk", 1792, 768, parkBackgnd);
  game.addView(kiosk);

  let demo = new View("demo", 1792, 768, demoBackgnd);
  game.addView(demo);

  let coffeeHouse = new View("coffeeHouse", 1792, 768, coffeeHouseBackgnd);
  game.addView(coffeeHouse);

  let bar = new View("bar", 1793, 768, barBackgnd);
  game.addView(bar);

  let pong = new View("pong", windowWidth, windowHeight, barBackgnd);
  game.addView(pong);

  let global = new View("global", windowWidth, windowHeight);
  game.addView(global);

  // display objects & interactive objects

  let titleScreenBackground = new ColorScreen(0, 0, 1935, 768, color("#512109"));
  titleScreen.addChild(titleScreenBackground);

  let titleScreenStreet = new ColorScreen(0, 580, 1935, windowHeight - windowHeight * 0.68, color("#000000"));
  titleScreen.addChild(titleScreenStreet);

  let startGameBtn = new TitleScreenButton(125, 240, 0, 20, "Spiel starten", window.fonts.rockwell, color("#8b4726"), color("#ffa500"), "playStartVideo");
  titleScreen.addChild(startGameBtn);

  let settingsBtn = new TitleScreenButton(125, 280, 0, 20, "Steuerung", window.fonts.rockwell, color("#8b4726"), color("#ffa500"), "showInstructions");
  titleScreen.addChild(settingsBtn);

  let aboutUsBtn = new TitleScreenButton(125, 320, 0, 20, "Über uns", window.fonts.rockwell, color("#8b4726"), color("#ffa500"), "showAboutUs");
  titleScreen.addChild(aboutUsBtn);

  let creditsBtn = new TitleScreenButton(125, 360, 0, 20, "Credits", window.fonts.rockwell, color("#8b4726"), color("#ffa500"), "showCredits");
  titleScreen.addChild(creditsBtn);

  window.addEventListener("playStartVideo", () => {
    startGameBtn.disable();
    settingsBtn.disable();
    aboutUsBtn.disable();
    creditsBtn.disable();
    coffeeHouseMusicSound.fade(0, 1);
    setTimeout(() => {
      coffeeHouseMusicSound.stop();
    }, 1000);
    window.dispatchEvent(new CustomEvent("enterView", { detail: "startVideo" }));
    setTimeout(() => {
      startVideoPlayer.play();
    }, 1000);
  });

  window.addEventListener("startGame", () => {
    if (!citySound.isLooping()) {
      citySound.loop();
      leavesSound.loop();
      fountainSound.loop();
      owlSound.loop();
    }
    if (!demoSound.isLooping()) {
      demoSound.loop();
    }
    animate.start("fadeStartVideo", false, () => {
      startVideoPlayer.stop();
    });

    window.dispatchEvent(new CustomEvent("enterView", { detail: "park" }));
    setTimeout(() => {
      phoneIcon.show();
      phoneIcon.enable();
    }, 1000);
  });

  let titleScreenImage = new DisplayObject(250, 100, 771, 524, titleScreenImg);
  titleScreen.addChild(titleScreenImage);

  let streetLamps = [];

  let titleScreenLampBulb = new StreetLampBulb(240, 125, 39, 17, streetLampBulbOnImg, streetLampBulbOffImg);
  titleScreen.addChild(titleScreenLampBulb);
  streetLamps.push(titleScreenLampBulb);

  let startGameBox = new InfoBox(
    725, 184,
    600, 400,
    "Spielstart",
    window.fonts.rockwell,
    "Klicke um das Spiel zu starten.",
    window.fonts.franklinGothic,
    color("#ffa500")
  );
  titleScreen.addChild(startGameBox);

  let instructionBox = new InfoBox(
    725, 184,
    600, 400,
    "Steuerung:",
    window.fonts.rockwell,
    "Bewege die Maus nach links oder rechts, um dich umzuschauen. Fahre mit der Maus über Objekte, wenn Sie interaktiv sind, wird sich dein Mauszeiger verändern.",
    window.fonts.franklinGothic,
    color("#ffa500")
  );
  titleScreen.addChild(instructionBox);

  let aboutUsBox = new InfoBox(
    725, 184,
    600, 400,
    "Über uns:",
    window.fonts.rockwell,
    "Wir sind Florian, Luisa, Max und Lars aus dem 2. Semesters des Studiengangs Interactive Media Design. Social Whispers ist unser gemeinsames Semesterprojekt. Es simuliert die Verbreitung von Informationen in sozialen Medien und soll Nutzenden dabei helfen, Informationen im Internet differenzierter zu betrachten. Wir möchten sie dazu anregen, sich Informationen immer aus mehreren, seriösen Quellen einzuholen.",
    window.fonts.franklinGothic,
    color("#ffa500")
  );
  titleScreen.addChild(aboutUsBox);

  let creditsBox = new InfoBox(
    725, 184,
    600, 400,
    "Credits:",
    window.fonts.rockwell,
    "Sounds: Zapsplat.com" +
    "                                                                          " +
    "Musik: freemusicarchive.org" +
    "                                                                        " +
    "Sprecher: Martin Haas (martin.haas@h-da.de)" +
    "                                          " +
    "Broken phone screen: https://www.vecteezy.com/free-vector/wrecking-ball ",
    window.fonts.franklinGothic,
    color("#ffa500")
  );
  titleScreen.addChild(creditsBox);

  window.addEventListener("showInstructions", () => {
    instructionBox.show();
    startGameBox.hide();
    aboutUsBox.hide();
    creditsBox.hide();
  });

  window.addEventListener("showAboutUs", () => {
    aboutUsBox.show();
    startGameBox.hide();
    instructionBox.hide();
    creditsBox.hide();
  });
  window.addEventListener("showCredits", () => {
    creditsBox.show();
    startGameBox.hide();
    instructionBox.hide();
    aboutUsBox.hide();
  });

  window.addEventListener("showStartInfo", () => {
    startGameBox.show();
    creditsBox.hide();
    instructionBox.hide();
    aboutUsBox.hide();
  });

  let videoScreenBackgnd = new ColorScreen(0, 0, windowWidth, windowHeight, color("#1E0E09"));
  startVideoScreen.addChild(videoScreenBackgnd);

  let startVideoPlayer;
  if (windowWidth < 1.778 * windowHeight) {
    startVideoPlayer = new VideoElement(0, (windowHeight - windowWidth / 1.778) / 2, windowWidth, windowWidth / 1.778, startVideo);
  } else {
    startVideoPlayer = new VideoElement((windowWidth - windowHeight * 1.778) / 2, 0, windowHeight * 1.778, windowHeight, startVideo);
  }
  startVideoScreen.addChild(startVideoPlayer);

  animate.addAnimation("fadeStartVideo", startVideoPlayer, "volume", 1, 0, 1);

  let videoSkipBtn = new StartGameButton(windowWidth - 300, windowHeight - 150, 224, 93, videoSkipBtnImg);
  startVideoScreen.addChild(videoSkipBtn);

  let moon_park = new DisplayObject(2086, 25, 213, 212, moonImg);
  park.addChild(moon_park);

  let moon_kiosk = new DisplayObject(950, -60, 213, 212, moonImg);
  kiosk.addChild(moon_kiosk);

  let city = new DisplayObject(0, 0, 4100, 769, cityImg);
  park.addChild(city);

  let street = new DisplayObject(1598, 345, 2125, 308, streetImg);
  park.addChild(street);

  let demoLink_bar = new DemoLink(1936, 338, 188, 132, demoLinkBarImg_off, demoLinkBarImg_on);
  park.addChild(demoLink_bar);

  let demoLink_demo = new DemoLink(1633, 372, 666, 176, demoLinkDemoImg_demo, demoLinkDemoImg_noDemo, demoLinkSignsLeftImg, demoLinkSignsRightImg);
  park.addChild(demoLink_demo);

  let coffeeHouseLink = new CoffeeHouseLink(3353, 352, 208, 129, coffeeHouseLinkImg);
  park.addChild(coffeeHouseLink);

  let trees = new DisplayObject(-1, 89, 4103, 695, treesImg);
  park.addChild(trees);

  let flyerBox_park = new FlyerBox(1262, 539, 61, 139, flyerBoxImg, "park");
  park.addChild(flyerBox_park);

  let kioskLink = new KioskLink(108, 206, 681, 377, kioskLinkImg_off, kioskLinkImg_on);
  park.addChild(kioskLink);

  let kioskLinkNewspapers = new DisplayObject(271, 452, 205, 24, kioskLinkNewspapersImg);
  park.addChild(kioskLinkNewspapers);
  kioskLinkNewspapers.hide();

  window.addEventListener("openKiosk", () => {
    kioskLink.open();
    kioskLinkNewspapers.show();
  });

  let parkForegnd = new DisplayObject(2, 228, 3904, 543, parkForegndImg);
  park.addChild(parkForegnd);

  let streetLamp_1 = new StreetLampBulb(496, 336, 39, 17, streetLampBulbOnImg, streetLampBulbOffImg);
  park.addChild(streetLamp_1);
  streetLamps.push(streetLamp_1);

  let streetLamp_2 = new StreetLampBulb(1012, 250, 35, 15, streetLampBulbOnImg, streetLampBulbOffImg);
  park.addChild(streetLamp_2);
  streetLamps.push(streetLamp_2);

  let streetLamp_3 = new StreetLampBulb(1450, 294, 35, 15, streetLampBulbOnImg, streetLampBulbOffImg);
  park.addChild(streetLamp_3);
  streetLamps.push(streetLamp_3);

  let streetLamp_4 = new StreetLampBulb(1756, 292, 35, 15, streetLampBulbOnImg, streetLampBulbOffImg);
  park.addChild(streetLamp_4);
  streetLamps.push(streetLamp_4);

  let streetLamp_5 = new StreetLampBulb(2565, 288, 35, 15, streetLampBulbOnImg, streetLampBulbOffImg);
  park.addChild(streetLamp_5);
  streetLamps.push(streetLamp_5);

  let streetLamp_6 = new StreetLampBulb(2872, 286, 35, 15, streetLampBulbOnImg, streetLampBulbOffImg);
  park.addChild(streetLamp_6);
  streetLamps.push(streetLamp_6);

  let streetLamp_7 = new StreetLampBulb(3488, 395, 24, 10, streetLampBulbOnImg, streetLampBulbOffImg);
  park.addChild(streetLamp_7);
  streetLamps.push(streetLamp_7);

  let streetLamp_8 = new StreetLampBulb(3605, 394, 16, 7, streetLampBulbOnImg, streetLampBulbOffImg);
  park.addChild(streetLamp_8);
  streetLamps.push(streetLamp_8);

  let streetLamp_9 = new StreetLampBulb(3736, 370, 39, 17, streetLampBulbOnImg, streetLampBulbOffImg);
  park.addChild(streetLamp_9);
  streetLamps.push(streetLamp_9);

  // random events

  // Bubbles
  // let influencerBubble = new Speechbubble( , , 300, "Influencer");
  // let conspircaryBubble = new Speechbubble( , , 300, "Conspiracy");

  let kioskTrees = new DisplayObject(0, 0, 1792, 768, kioskTreesImg);
  kiosk.addChild(kioskTrees);

  let kioskBuilding = new Kiosk(298, 55, 733, 579, kioskBuildingImg_off, kioskBuildingImg_on);
  kiosk.addChild(kioskBuilding);
  window.addEventListener("openKiosk", () => {
    kioskBuilding.open();
  });

  let newspapers = [];

  let newspaperOne = new Newspaper(549, 446, 79, 37, newspaperImg, "conspiracy-theorist");
  newspapers.push(newspaperOne);

  let newspaperTwo = new Newspaper(633, 446, 79, 37, newspaperImg, "follower");
  newspapers.push(newspaperTwo);

  let newspaperThree = new Newspaper(714, 446, 79, 37, newspaperImg, "wannabe-influencer");
  newspapers.push(newspaperThree);

  let newspaperFour = new Newspaper(798, 446, 79, 37, newspaperImg, "reflective-user");
  newspapers.push(newspaperFour);

  newspapers.forEach((elem) => kiosk.addChild(elem));

  window.addEventListener("openKiosk", () => {
    newspapers.forEach((elem) => {
      elem.show();
      elem.enable();
    });
  });
  window.addEventListener("buyNewspaper", (ev) => {
    newspapers.forEach((elem) => {
      if (elem.name === ev.detail) elem.hide();
      elem.disable();
    });
  });
  window.addEventListener("hideNewspapers", () => {
    newspapers.forEach((elem) => elem.hide());
    kioskLinkNewspapers.hide();
  });

  let kioskSunshade = new DisplayObject(859, 240, 500, 400, kioskSunshadeImg);
  kiosk.addChild(kioskSunshade);

  let kioskTrashcan = new DisplayObject(300, 528, 101, 110, kioskTrashcanImg);
  kiosk.addChild(kioskTrashcan);

  let parkLink_kiosk = new ParkLink(1506, 300, 131, 145, parkLinkImg_kiosk);
  kiosk.addChild(parkLink_kiosk);

  let streetLamp_coffeeHouse = new StreetLampBulb(280, 63, 37, 16, streetLampBulbOnImg, streetLampBulbOffImg);
  coffeeHouse.addChild(streetLamp_coffeeHouse);
  streetLamps.push(streetLamp_coffeeHouse);

  let coffeeHouseForegnd = new DisplayObject(0, 0, 1792, 768, coffeeHouseForegndImg);
  coffeeHouse.addChild(coffeeHouseForegnd);

  let parkLink_coffeeHouse = new ParkLink(129, 123, 241, 57, parkLinkImg_coffeeHouse);
  coffeeHouse.addChild(parkLink_coffeeHouse);

  let barForegnd = new DisplayObject(0, 0, 1793, 769, barForegndImg);
  bar.addChild(barForegnd);

  let barLamp_1 = new BarLampBulb(280, 160, 74, 32, streetLampBulbOnImg, streetLampBulbOffImg);
  bar.addChild(barLamp_1);
  streetLamps.push(barLamp_1);

  let barLamp_2 = new BarLampBulb(1033, 203, 74, 32, streetLampBulbOnImg, streetLampBulbOffImg);
  bar.addChild(barLamp_2);
  barLamp_2.switch();
  barLamp_2.disable();

  let barLamp_3 = new BarLampBulb(1270, 217, 74, 32, streetLampBulbOnImg, streetLampBulbOffImg);
  bar.addChild(barLamp_3);
  barLamp_3.switch();
  barLamp_3.disable();

  let barArcade = new Arcade(1532, 222, 210, 528, barArcadeImg_dark, barArcadeImg_light);
  bar.addChild(barArcade);

  let barPhone = new BarPhone(357, 356, 22, 8, barPhoneImg);
  bar.addChild(barPhone);

  animate.addAnimation("barPhoneVibrate_1", barPhone, "rotationAngle", 0, 0.05, 0.025);
  animate.addAnimation("barPhoneVibrate_2", barPhone, "rotationAngle", 0.05, -0.05, 0.05);

  let streetLampDemo_1 = new StreetLampBulb(614, 34, 17, 8, streetLampBulbOnImg, streetLampBulbOffImg);
  demo.addChild(streetLampDemo_1);
  streetLamps.push(streetLampDemo_1);

  let streetLampDemo_2 = new StreetLampBulb(1333, 31, 17, 8, streetLampBulbOnImg, streetLampBulbOffImg);
  demo.addChild(streetLampDemo_2);
  streetLamps.push(streetLampDemo_2);

  setInterval(() => {
    for (let elem of streetLamps) {
      if (elem.parent.name === game.currentView) {
        if (((elem.parent.name === "bar" || elem.parent.name === "titlescreen") && !floor(random(0, 3))) ||
          (elem.getRealPos().x > 0 && elem.getRealPos().x < windowWidth && !floor(random(0, 10)))) {
          elem.switch();
          lampClickSound.play();
          setTimeout(() => {
            elem.switch();
            lampClickSound.stop();
          }, 100 * random([1, 1, 1, 2, 2, 3, 4, 5]));
        }
      }
    }
  }, 1000);

  let demoForegnd = new DemoForegnd(-160, -6, 2180, 845, demoForegndImg_demo, demoForegndImg_pastDemo);
  demo.addChild(demoForegnd);

  let barLink = new BarLink(1091, 137, 147, 228, barLinkImg);
  demo.addChild(barLink);

  let demoPeople = new DemoPeople(223, 281, 546, 362, demoPeopleImg_left, "demo");
  demo.addChild(demoPeople);

  let counterDemoPeople = new DemoPeople(1081, 322, 503, 352, demoPeopleImg_right, "counterDemo");
  demo.addChild(counterDemoPeople);

  let demoSignsLeft = new AnimatedDisplayObject(214, 215, 1315, 322, demoPeopleSignsImg_left);
  demo.addChild(demoSignsLeft);

  let demoSignsRight = new AnimatedDisplayObject(268, 226, 1311, 313, demoPeopleSignsImg_right);
  demo.addChild(demoSignsRight);

  animate.addAnimation("moveDemoSigns_left", demoSignsLeft, "y", demoSignsLeft.saveY - 5, demoSignsLeft.saveY + 5, 0.5, "ease-in-out-quad");
  animate.addAnimation("moveDemoSigns_right", demoSignsRight, "y", demoSignsRight.saveY - 5, demoSignsRight.saveY + 5, 0.5, "ease-in-out-quad");

  let demoAnimation_left;
  let demoAnimation_right;

  window.addEventListener("startDemoAnimation", () => {
    demoAnimation_left = setInterval(() => {
      animate.start("moveDemoSigns_left", false, () => {
        animate.start("moveDemoSigns_left", true);
      });
    }, 1000);

    demoAnimation_right = setInterval(() => {
      setTimeout(() => {
        animate.start("moveDemoSigns_right", false, () => {
          animate.start("moveDemoSigns_right", true);
        });
      }, 400);
    }, 1000);
  });

  window.addEventListener("stoppDemoAnimation", () => {
    clearInterval(demoAnimation_left);
    clearInterval(demoAnimation_right);
  });

  let demoBubble = new Speechbubble(300, -150, 270, "Demo_1", "left");
  demoPeople.addChild(demoBubble);

  let counterDemoBubble = new Speechbubble(20, -150, 270, "Demo_2");
  counterDemoPeople.addChild(counterDemoBubble);

  let demoBench = new DemoBench(5, 578, 461, 231, demoBenchImg);
  demo.addChild(demoBench);

  let parkLink_demo = new ParkLink(1612, 337, 184, 65, parkLinkImg_demo);
  demo.addChild(parkLink_demo);

  let demoSign = new DemoSign(790, 668, 116, 51, demoSignImg);
  demo.addChild(demoSign);

  window.addEventListener("pickupSign", () => {
    parkLink_demo.disable();
    demoBench.disable();

    if (player.actionDone("coffeeHouse", "invitationAccepted")) {
      if (player.actionDone("coffeeHouse", "invitationAccepted", true)) {
        demoPeople.enable();
        demoBubble.show();
      } else {
        counterDemoPeople.enable();
        counterDemoBubble.show();
      }
    } else {
      demoPeople.enable();
      demoBubble.show();
      counterDemoPeople.enable();
      counterDemoBubble.show();
    }
  });

  window.addEventListener("joinDemo", (ev) => {
    parkLink_demo.enable();
    demoBubble.hide();
    counterDemoBubble.hide();
    demoPeople.disable();
    counterDemoPeople.disable();

    if (ev.detail === "demo") {
      setTimeout(() => {
        homeScreen.setPost(postImg_demoJoined);
        phoneIcon.setNotification();
        homeScreenBtn.setNotification();
        window.dispatchEvent(new CustomEvent("phoneVibration"));
      }, 6000);
    } else {
      setTimeout(() => {
        homeScreen.setPost(postImg_counterDemoJoined);
        phoneIcon.setNotification();
        homeScreenBtn.setNotification();
        window.dispatchEvent(new CustomEvent("phoneVibration"));
      }, 6000);
    }
  });

  window.addEventListener("watchDemo", () => {
    demoSign.disable();
    window.dispatchEvent(new CustomEvent("openPhone"));
    mobilePhone.showScreen("postScreen");
    window.dispatchEvent(new CustomEvent("choosePost"));
    phoneButton.disable();
  });

  window.addEventListener("endDemo", () => {
    demoForegnd.endDemo();
    demoPeople.hide();
    counterDemoPeople.hide();
    demoSignsLeft.hide();
    demoSignsRight.hide();

    demoLink_demo.endDemo();
    demoLink_bar.endDemo();
    barLink.show();

    demoSound.fade(0, 1);
    demoSound.stop();
  });

  window.addEventListener("friendMessage", () => {
    setTimeout(() => {
      messageScreen.reset();
      phoneButton.enable();
      barLink.enable();
      messageScreen.setEvent("friendMessage");
      phoneIcon.setNotification();
      msgScreenBtn.setNotification();
      window.dispatchEvent(new CustomEvent("phoneVibration"));
    }, 2000);
  });

  let door_coffeeHouse = new Door(1300, 379, 128, 214, doorImg);
  coffeeHouse.addChild(door_coffeeHouse);

  window.addEventListener("enterCoffeeHouse", () => {
    if (
      player.actionDone("demo", "joinDemo") ||
      player.actionDone("coffeeHouse", "groupInvitation")
    ) {
      setTimeout(() => {
        messageScreen.reset();
        messageScreen.setEvent("interview");
        phoneIcon.setNotification();
        msgScreenBtn.setNotification();
        phoneButton.disable();
        window.dispatchEvent(new CustomEvent("phoneVibration"));
      }, 14000);
    }

    lampClickSound.fade(0, 1);
    fountainSound.fade(0, 1);
    citySound.fade(0, 1);
    leavesSound.fade(0, 1);
    doorSound.play();

    coffeeHouse.disable();
    animate.start("fadeOut");

    setTimeout(() => {
      coffeeHouseSound.play();
      coffeeHouseMusicSound.play();
      coffeeHouseMusicSound.setVolume(0.15);
    }, 800);
    setTimeout(() => {
      coffeeHouseSound.fade(0, 1);
      coffeeHouseMusicSound.fade(0, 1);
    }, 10000);
    setTimeout(() => {
      doorSound.play();
      citySound.fade(0.1, 2);
      leavesSound.fade(0.6, 2);
      fountainSound.fade(0.06, 2);
      lampClickSound.fade(0.2, 2);
      animate.start("fadeOut", true, () => {
        coffeeHouse.enable();
      });
    }, 10500);
    setTimeout(() => {
      coffeeHouseSound.stop();
      coffeeHouseMusicSound.stop();
    }, 12500);
  });

  window.addEventListener("interviewAccepted", (ev) => {
    if (!ev.detail) {
      phoneButton.enable();

      setTimeout(() => {
        homeScreen.setPost(postImg_interviewDenied);
        phoneIcon.setNotification();
        homeScreenBtn.setNotification();
        window.dispatchEvent(new CustomEvent("phoneVibration"));
      }, 8000);
    }
  });

  window.addEventListener("statementDefended", () => {
    setTimeout(() => {
      if (player.actionDone("coffeeHouse", "statementDefended", true)) {
        if (player.actionDone("coffeeHouse", "proDemo", true)) {
          homeScreen.setPost(postImg_interviewDefend);

        } else {
          homeScreen.setPost(postImg_interviewRevoke);
        }
      } else if (player.actionDone("coffeeHouse", "proDemo", true)) {
        homeScreen.setPost(postImg_interviewRevoke);
      } else {
        homeScreen.setPost(postImg_interviewDefend);
      }
      window.dispatchEvent(new CustomEvent("phoneVibration"));
      phoneIcon.setNotification();
      homeScreenBtn.setNotification();
    }, 8000);
    phoneButton.enable();
  });

  window.addEventListener("groupInvitation", () => {
    setTimeout(() => {
      messageScreen.reset();
      messageScreen.setEvent("invite");
      phoneButton.disable();
      window.dispatchEvent(new CustomEvent("phoneVibration"));
      phoneIcon.setNotification();
      msgScreenBtn.setNotification();
    }, 6000);
  });

  window.addEventListener("invitationAccepted", () => {
    phoneButton.enable();
  });

  let flyerBox_coffeeHouse = new FlyerBox(601, 445, 61, 139, flyerBoxImg, "coffeeHouse");
  coffeeHouse.addChild(flyerBox_coffeeHouse);

  let arcadeScreen = new ColorScreen(0, 0, windowWidth, windowHeight, color("#888988"));
  pong.addChild(arcadeScreen);

  let pongGame = new PongGame((windowWidth - 1.1 * windowHeight) / 2, 0.1 * windowHeight, 1.1 * windowHeight, 0.8 * windowHeight);
  pong.addChild(pongGame);

  let pongStartBtn = new PongStartButton(0.9 * windowWidth - 150, windowHeight - 360, 150, 389, pongStartImg);
  pong.addChild(pongStartBtn);

  let leaveArcadeBtn = new LeaveArcadeButton(0.1 * windowWidth, windowHeight - 360, 150, 389, pongBackImg);
  pong.addChild(leaveArcadeBtn);

  animate.addAnimation("movePongStartBtn", pongStartBtn, "y", pongStartBtn.y, pongStartBtn.y + 50, 0.2, "ease-in-out-sine");
  animate.addAnimation("movePongBackBtn", leaveArcadeBtn, "y", leaveArcadeBtn.y, leaveArcadeBtn.y + 50, 0.2, "ease-in-out-sine")

  window.addEventListener("pongStart", () => {
    arcadeLeverSound.play();
    animate.start("movePongStartBtn", false, () => {
      animate.start("movePongStartBtn", true, () => {
        setTimeout( () => {
          pongGame.start();
        }, 30);
      });
    });
  });

  window.addEventListener("pongLeave", () => {
    arcadeLeverSound.play();
    animate.start("movePongBackBtn", false, () => {
      window.dispatchEvent(new CustomEvent("enterView", { detail: "bar" }));
      animate.start("movePongBackBtn", true);
    });
  });

  // global objects
  let flyerCoffeeHouse = new Flyer(492, 736, flyerImg_coffeeHouse);
  global.addChild(flyerCoffeeHouse);

  let flyerPark = new Flyer(492, 736, flyerImg_park);
  global.addChild(flyerPark);

  window.addEventListener("pickupFlyer", (ev) => {
    phoneIcon.disable();
    if (ev.detail === "coffeeHouse") {
      flyerCoffeeHouse.show();
      flyerCoffeeHouse.enable();
      if (!player.actionDone("coffeeHouse", "groupInvitation")) {
        window.dispatchEvent(
          new CustomEvent("addAction", {
            detail: {
              origin: "coffeeHouse",
              name: "groupInvitation",
              data: {},
            },
          })
        );
      }
    } else {
      flyerPark.show();
      flyerPark.enable();
    }
    player.usePhone(true);
  });

  window.addEventListener("closeFlyer", () => {
    phoneIcon.enable();
    player.usePhone(false);
  });

  let phoneIcon = new PhoneIcon(windowWidth - 150, windowHeight - 200, 112, 168, phoneIconImg);
  global.addChild(phoneIcon);

  window.addEventListener("hidePhoneIcon", () => {
    phoneIcon.hide();
    phoneIcon.disable();
  });

  window.addEventListener("showPhoneIcon", () => {
    phoneIcon.show();
    phoneIcon.enable();
  });

  window.addEventListener("resetNotification", () => {
    phoneIcon.resetNotification();
  })

  animate.addAnimation("phoneVibrate_1", phoneIcon, "rotationAngle", 0, 0.05, 0.025);
  animate.addAnimation("phoneVibrate_2", phoneIcon, "rotationAngle", 0.05, -0.05, 0.05);

  let mobilePhone = new MobilePhone(492, 739, phoneOutlineImg, phoneOverlayImg, brokenPhoneOverlayImg);
  global.addChild(mobilePhone);

  window.addEventListener("clearNotifications", () => {
    if (homeScreenBtn.notificationActive() && mobilePhone.activeScreen() === "homeScreen") {
      homeScreenBtn.resetNotification();
      if (!msgScreenBtn.notificationActive()) {
        phoneIcon.resetNotification();
      }
    } else if (msgScreenBtn.notificationActive() && mobilePhone.activeScreen() === "messageScreen") {
      msgScreenBtn.resetNotification();
      if (!homeScreenBtn.notificationActive()) {
        phoneIcon.resetNotification();
      }
    }
  });

  let phoneButton = new PhoneButton(221, 677, 50, 50, phoneBtnImg);
  mobilePhone.addChild(phoneButton);

  animate.addAnimation("moveToCenter_h", phoneIcon, "x", phoneIcon.saveX, mobilePhone.x, 0.6, "linear");
  animate.addAnimation("moveToCenter_v", phoneIcon, "y", phoneIcon.saveY, mobilePhone.y, 0.6, "ease-in-quad");
  animate.addAnimation("scaleToPhoneSize", phoneIcon, "scale", phoneIcon.saveScale,
    mobilePhone.scale * (mobilePhone.height / phoneIcon.height), 0.6, "ease-in-quad");

  window.addEventListener("openPhone", () => {
    phoneIcon.showNotification(false);
    animate.start("moveToCenter_h");
    animate.start("moveToCenter_v");
    animate.start("scaleToPhoneSize", false, () => {
      window.dispatchEvent(new CustomEvent("hidePhoneIcon"));
      mobilePhone.show();
      mobilePhone.enable();
      window.dispatchEvent(new CustomEvent("clearNotifications"));
    });
    player.usePhone(true);
  });

  window.addEventListener("closePhone", () => {
    phoneIcon.showNotification(true);
    window.dispatchEvent(new CustomEvent("showPhoneIcon"));
    mobilePhone.hide();
    mobilePhone.disable();
    player.usePhone(false);

    animate.start("moveToCenter_h", true);
    animate.start("moveToCenter_v", true);
    animate.start("scaleToPhoneSize", true);

    if (
      player.actionDone("coffeeHouse", "invitationAccepted") &&
      !player.actionDone("coffeeHouse", "invitationPostWatched")
    ) {
      setTimeout(() => {
        if (player.actionDone("coffeeHouse", "invitationAccepted", true)) {
          homeScreen.setPost(postImg_groupInvitationAccepted);
          demoBench.disable();
        } else {
          homeScreen.setPost(postImg_groupInvitationDenied);
        }
        homeScreenBtn.setNotification();
        phoneIcon.setNotification();
        window.dispatchEvent(new CustomEvent("phoneVibration"));
        window.dispatchEvent(
          new CustomEvent("addAction", {
            detail: {
              origin: "coffeeHouse",
              name: "invitationPostWatched",
              data: {},
            },
          })
        );
      }, 3000);
    }
  });

  let homeScreenBtn = new PhoneMenuIcon(67, 615, 65, 41, homeIconImg, "homeScreen");
  mobilePhone.addChild(homeScreenBtn);

  let postScreenBtn = new PhoneMenuIcon(220, 618, 55, 35, postIconImg, "postScreen");
  mobilePhone.addChild(postScreenBtn);

  let msgScreenBtn = new PhoneMenuIcon(360, 615, 65, 41, msgIconImg, "messageScreen");
  mobilePhone.addChild(msgScreenBtn);

  window.addEventListener("showScreen", (ev) => {
    window.dispatchEvent(new CustomEvent("phoneTap"));
    mobilePhone.showScreen(ev.detail);
  });

  let homeScreen = new PhoneHomeScreen(18.9, 111.2, 454, 491, postOverlayImg);
  mobilePhone.addChild(homeScreen);
  mobilePhone.showScreen("homeScreen");

  let postScreen = new PhonePostScreen(18.9, 111.2, 454, 491);
  mobilePhone.addChild(postScreen);

  let postButton = new PhonePostButton(165, 428, 125, 50);
  postScreen.addChild(postButton);

  let choosePostBtn_1 = new ChoosePostButton(17, 428, 125, 50, "A", postImg_watchedProDemo);
  postScreen.addChild(choosePostBtn_1);

  let choosePostBtn_2 = new ChoosePostButton(165, 428, 125, 50, "B", postImg_watchedProCounterDemo);
  postScreen.addChild(choosePostBtn_2);

  let choosePostBtn_3 = new ChoosePostButton(313, 428, 125, 50, "C", postImg_watchedProNone);
  postScreen.addChild(choosePostBtn_3);

  window.addEventListener("choosePost", () => {
    postScreen.setPost(postImg_watchedProDemo);
    choosePostBtn_1.show();
    choosePostBtn_1.enable();
    choosePostBtn_2.show();
    choosePostBtn_2.enable();
    choosePostBtn_3.show();
    choosePostBtn_3.enable();
  });

  window.addEventListener("postChosen", (ev) => {
    choosePostBtn_1.hide();
    choosePostBtn_1.disable();
    choosePostBtn_2.hide();
    choosePostBtn_2.disable();
    choosePostBtn_3.hide();
    choosePostBtn_3.disable();
    phoneButton.enable();
    homeScreen.setPost(ev.detail);
    mobilePhone.showScreen("homeScreen");
  });

  window.addEventListener("addPost", () => {
    homeScreen.setPost(postScreen.getPost());
    homeScreen.redraw();
  });

  let messageScreen = new PhoneMessageScreen(18.9, 111.2, 454, 491, userIconImg, journalistIconImg, conspiracyIconImg);
  mobilePhone.addChild(messageScreen);

  let msgButton_1 = new PhoneMessageButton(17, 428, 200, 50, "A");
  messageScreen.addChild(msgButton_1);

  let msgButton_2 = new PhoneMessageButton(238, 428, 200, 50, "B");
  messageScreen.addChild(msgButton_2);

  let endScreen = new PhoneEndScreen(18.9, 111.2, 454, 491, brokenPhoneOverlayImg, userIconImg);
  mobilePhone.addChild(endScreen);

  let endBtn = new PhoneEndButton(130, 428, 200, 50);
  endScreen.addChild(endBtn);

  window.addEventListener("revealRole", () => {
    endScreen.answer(player.getPersona());
    videoPlayer.setVideo();
  });

  let videoPlayer = new PhoneVideoPlayer(30, 335, 390, 293, videoOverlayImg, endVideo);
  endScreen.addChild(videoPlayer);
  for (let elem of endVideo) {
    document.getElementById(elem.elt.id).onended = () => {
      videoPlayer.updatePosition();
      videoPlayer.activateButtons();
    };
  }

  let moreInfoBtn = new MoreInfoButton(17, 428, 200, 50);
  endScreen.addChild(moreInfoBtn);

  let restartBtn = new RestartButton(238, 428, 200, 50);
  endScreen.addChild(restartBtn);

  let mailBtn = new PhoneMailButton(370, 428, 70, 50);
  endScreen.addChild(mailBtn);

  window.addEventListener("endGame", () => {
    phoneVibrationSound.stop();
    phoneVibrationSound.setLoop(false);
    clearInterval(barPhoneVibrate);
    barPhone.hide();
    window.dispatchEvent(new CustomEvent("openPhone"));
    mobilePhone.showScreen("endScreen");
    msgScreenBtn.setTarget("endScreen");
    mobilePhone.break();
    homeScreenBtn.resetNotification();
    msgScreenBtn.resetNotification();
    phoneButton.disable();
  });

  window.addEventListener("restartGame", () => {
    game.reset();
  });

  let mailTextInput = new TextArea(17, 428, 350, 50, keys);
  endScreen.addChild(mailTextInput);
  keys.getFocus(mailTextInput);

  let fadeScreen = new ColorScreen(0, 0, windowWidth, windowHeight, color("#000000"));
  global.addChild(fadeScreen);

  animate.addAnimation("fadeOut", fadeScreen, "opacity", 0, 1, 1, "ease-in-out-quad");
  animate.start("fadeOut", true);

  // sound setup
  outsideStepsSound_fast.setVolume(0.3);
  outsideStepsSound_slow.setVolume(0.3);
  insideStepsSound_fast.setVolume(0.2);
  insideStepsSound_slow.setVolume(0.2);
  flyerSound.setVolume(0.3);
  streetsignClickSound.setVolume(0.7);
  pickupSignSound.setVolume(0.8);
  phoneVibrationSound.setVolume(1.3);
  phoneMsgSound.setVolume(0.4);
  phoneTapSound.setVolume(0.5);
  newspaperSound.setVolume(0.3);
  fountainSound.setVolume(0);
  owlSound.setVolume(0.05);
  demoSound.setVolume(0.02);
  doorSound.setVolume(0.3);
  coffeeHouseSound.setVolume(0.7);
  coffeeHouseMusicSound.setVolume(0.15);
  lampClickSound.setVolume(0.2);
  registerSound.setVolume(0.7);
  citySound.setVolume(0.05);
  demoBenchSound.setVolume(0.6);
  arcadeLeverSound.setVolume(0.4);

  coffeeHouseMusicSound.loop();

  window.addEventListener("soundReset", () => {
    coffeeHouseMusicSound.setVolume(0.15);
    phoneVibrationSound.setVolume(1.3);
    demoSound.setVolume(0.02);
    citySound.setVolume(0.05);

    demoSound.loop();
  });
}

/* sound events */

window.addEventListener("playButtonSound", () => {
  if (!buttonSound.isPlaying()) {
    buttonSound.play();
  }
});

window.addEventListener("phoneSendMsg", () => {
  phoneMsgSound.play();
});

window.addEventListener("phoneVibration", () => {
  if (!phoneVibrationSound.isPlaying()) {
    phoneVibrationSound.play();
  }
  animate.start("phoneVibrate_1", false, () => {
    let count = 0;
    let interval = setInterval(() => {
      animate.start("phoneVibrate_2", false, () => {
        if (count < 18) {
          animate.start("phoneVibrate_2", true);
        } else {
          animate.start("phoneVibrate_2", true, () => {
            animate.start("phoneVibrate_1", false);
          });
        }
      });
      count++;
      if (count > 18) {
        clearInterval(interval);
      }
    }, 100);
  });
});

let barPhoneVibrate;

window.addEventListener("barPhoneVibration", () => {
  if (!phoneVibrationSound.isLooping()) {
    phoneVibrationSound.loop();
  }
  animate.start("barPhoneVibrate_1", false, () => {
    barPhoneVibrate = setInterval(() => {
      animate.start("barPhoneVibrate_2", false, () => {
        animate.start("barPhoneVibrate_2", true);
      });
    }, 100);
  });
});

window.addEventListener("phoneTap", () => {
  phoneTapSound.play();
});

window.addEventListener("pickupSign", () => {
  pickupSignSound.play();
});

window.addEventListener("pickupFlyer", () => {
  flyerSound.play();
});

window.addEventListener("closeFlyer", () => {
  flyerSound.play();
});

window.addEventListener("buyNewspaper", () => {
  newspaperSound.play();
  setTimeout(() => {
    registerSound.play();
  }, 500);
});

window.addEventListener("lampClick", () => {
  lampClickSound.play();
  lampClickSound.setVolume(0.6);
  lampClickSound.fade(0.2, 0.3);
});

window.addEventListener("tapPhone", () => {
  phoneTapSound.play();
});

window.addEventListener("streetsignClick", () => {
  streetsignClickSound.play();
});

window.addEventListener("benchSitdown", () => {
  demoBenchSound.play();
});

window.addEventListener("walkOutsideFast", () => {
  if (
    !outsideStepsSound_fast.isPlaying() &&
    !outsideStepsSound_slow.isPlaying()
  ) {
    outsideStepsSound_fast.play();
  }
});

window.addEventListener("walkOutsideSlow", () => {
  if (
    !outsideStepsSound_slow.isPlaying() &&
    !outsideStepsSound_fast.isPlaying()
  ) {
    outsideStepsSound_slow.play();
  }
});

window.addEventListener("walkInsideFast", () => {
  if (
    !insideStepsSound_fast.isPlaying() &&
    !insideStepsSound_slow.isPlaying()
  ) {
    insideStepsSound_fast.play();
  }
});

window.addEventListener("walkInsideSlow", () => {
  if (
    !insideStepsSound_slow.isPlaying() &&
    !insideStepsSound_fast.isPlaying()
  ) {
    insideStepsSound_slow.play();
  }
});

/* parameter changes */

window.addEventListener("pickupSign", () => {
  player.changeParameters(0, 0, 1);
});

window.addEventListener("joinDemo", (ev) => {
  if (ev.detail === "demo") {
    player.changeParameters(1, -2, 0);
  } else {
    player.changeParameters(-1, 1, 0);
  }
});

window.addEventListener("watchDemo", () => {
  player.changeParameters(-1, 0, 0);
});

window.addEventListener("postChosen", (ev) => {
  switch (ev.detail) {
    case postImg_watchedProDemo:
      player.changeParameters(1, -1, 1);
      break;
    case postImg_watchedProCounterDemo:
      player.changeParameters(0, 1, 1);
      break;
    case postImg_watchedProNone:
      player.changeParameters(0, 0, 1);
      break;
  }
});

window.addEventListener("pickupFlyer", (ev) => {
  if (ev.detail === "coffeeHouse") {
    player.changeParameters(0, 1, 0);
  }
});

window.addEventListener("invitationAccepted", (ev) => {
  if (ev.detail) {
    player.changeParameters(2, -2, -1);
  } else {
    player.changeParameters(-1, 1, 0);
  }
});

window.addEventListener("interviewAccepted", (ev) => {
  if (ev.detail) {
    player.changeParameters(0, 1, 1);
  } else {
    player.changeParameters(0, 0, -2);
  }
});

window.addEventListener("statementDefended", (ev) => {
  if (ev.detail) {
    if (player.actionDone("coffeeHouse", "proDemo", true)) {
      player.changeParameters(1, -1, 1);
    } else {
      player.changeParameters(-1, 1, -1);
    }
  } else if (player.actionDone("coffeeHouse", "proDemo", true)) {
    player.changeParameters(1, -1, -1);
  } else {
    player.changeParameters(1, -1, -1);
  }
});

window.addEventListener("buyNewspaper", (ev) => {
  switch (ev.detail) {
    case "conspiracy-theorist":
      player.changeParameters(1, -1, -1);
      break;
    case "wannnabe-influencer":
      player.changeParameters(1, -1, 1);
      break;
    case "reflective-user":
      player.changeParameters(-1, 1, -1);
      break;
    case "follower":
      player.changeParameters(-1, -1, -1);
  }
});

/* display */

function draw() {
  game.display();
}
window.draw = draw;

/* interaction */

function mouseClicked() {
  game.mouseClicked();
}
window.mouseClicked = mouseClicked;

function mousePressed() {
  game.mousePressed();
}
window.mousePressed = mousePressed;

function mouseReleased() {
  game.mouseReleased();
}
window.mouseReleased = mouseReleased;

function mouseWheel(ev) {
  game.mouseWheel(ev);
}
window.mouseWheel = mouseWheel;

function keyTyped() {
  keys.keyTyped();
}
window.keyTyped = keyTyped;

function keyPressed() {
  keys.keyPressed();
}
window.keyPressed = keyPressed;

window.addEventListener("cursor", (ev) => {
  if (ev.detail === "hovered") {
    cursor("./img/assets/cursorHovered.png");
  } else {
    cursor("./img/assets/cursorStandard.png");
  }
});