var e=Object.defineProperty,t=(t,i,s)=>((t,i,s)=>i in t?e(t,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[i]=s)(t,"symbol"!=typeof i?i+"":i,s);import{p as i,P as s}from"./phaser-DqFVsdsa.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const i of e)if("childList"===i.type)for(const e of i.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();class o extends i.Scene{constructor(){super("Boot")}preload(){}create(){this.scene.start("Preloader")}}const n=class e{constructor(){t(this,"key"),t(this,"gameconf",{width:f.config.width,height:f.config.height,center:{width:f.config.width/2,height:f.config.height/2},pvp:!1}),t(this,"paddle",{size:{width:40,height:200},side:{LEFT:100,RIGHT:this.gameconf.width-100},paddle_speed:500}),t(this,"ball",{speed:500,max_speed:900}),t(this,"score",{p1:0,p2:0}),t(this,"controls",{main_menu:s.Input.Keyboard.KeyCodes.ESC}),t(this,"controls_p1",{id:"player 1",UP:s.Input.Keyboard.KeyCodes.W,DOWN:s.Input.Keyboard.KeyCodes.S}),t(this,"controls_p2",{id:"player 2",UP:s.Input.Keyboard.KeyCodes.UP,DOWN:s.Input.Keyboard.KeyCodes.DOWN})}static getInstance(){return e.instance||(e.instance=new e),e.instance}openMenu(e){this.key=e.input.keyboard,this.key.addKey(this.controls.main_menu).isDown&&e.scene.start("MainMenu")}};t(n,"instance");let c=n;class h extends Phaser.Physics.Arcade.Image{constructor(e,i,s,o,n){super(e,i,s,o),t(this,"config"),t(this,"key"),this.scene=e,this.player=n,this.config=c.getInstance(),this.key=e.input.keyboard}controls(){this.key.addKey(this.player.UP).isDown?(this.setVelocityY(-this.config.paddle.paddle_speed),this.body.y<=0&&this.setVelocityY(0)):this.key.addKey(this.player.DOWN).isDown?(this.setVelocityY(this.config.paddle.paddle_speed),this.body.y>=this.config.gameconf.height-200&&this.setVelocityY(0)):this.setVelocityY(0)}createPaddle(){this.scene.physics.add.existing(this),this.scene.add.existing(this),this.setDisplaySize(this.config.paddle.size.width,this.config.paddle.size.height),this.setImmovable(!0)}}class a extends s.Physics.Arcade.Image{constructor(e,i,s,o,n){super(e,i,s,o),t(this,"config"),t(this,"y_follow"),this.scene=e,this.x=i,this.y=s,this.img=o,this.ball=n,this.config=c.getInstance()}createPaddle(){this.scene.physics.add.existing(this),this.scene.add.existing(this),this.setDisplaySize(this.config.paddle.size.width,this.config.paddle.size.height),this.setImmovable(!0)}followBall(){var e,t;this.y_follow=this.ball.body.y-this.body.height/2.5,this.y_follow>=this.body.y?(this.body.y/2<=0&&this.setVelocityY(0),this.setVelocityY(500),this.setAccelerationY(2e3),(null==(e=this.body)?void 0:e.velocity.y)>700&&this.setAccelerationY(0)):this.y_follow<=this.body.y&&(this.body.y/2>=this.config.gameconf.height+100&&this.setVelocity(0),this.setVelocityY(-500),this.setAccelerationY(-2e3),(null==(t=this.body)?void 0:t.velocity.y)<=-700&&this.setAccelerationY(0))}}class l extends i.Scene{constructor(){super("Game"),t(this,"player_1"),t(this,"player_2"),t(this,"player_comp"),t(this,"ball"),t(this,"board"),t(this,"config"),this.config=c.getInstance()}preload(){this.load.image("player","/assets/box.png"),this.load.image("ball","/assets/Ball.png"),this.load.audio("collide_sound","/assets/sounds/ball_hit_1.mp3")}create(){console.log(this.config.gameconf.pvp),this.board=this.createBoardGraphics(),this.createBall(),this.config.gameconf.pvp?(this.player_1=new h(this,this.config.paddle.side.LEFT,this.config.gameconf.center.height,"player",this.config.controls_p1),this.player_1.createPaddle(),this.player_2=new h(this,this.config.paddle.side.RIGHT,this.config.gameconf.center.height,"player",this.config.controls_p2),this.player_2.createPaddle(),this.physics.add.collider(this.ball,[this.player_1,this.player_2],(()=>{this.sound.play("collide_sound")}))):this.config.gameconf.pvp||(this.player_1=new h(this,this.config.paddle.side.LEFT,this.config.gameconf.center.height,"player",this.config.controls_p1),this.player_1.createPaddle(),this.player_comp=new a(this,this.config.paddle.side.RIGHT,this.config.gameconf.center.height,"player",this.ball),this.player_comp.createPaddle(),this.physics.add.collider(this.ball,[this.player_1,this.player_comp],(()=>{this.sound.play("collide_sound")}))),this.physics.world.setBoundsCollision(!0,!0,!0,!0),this.countdown()}update(){this.gameLogic(),this.player_1.controls(),this.config.gameconf.pvp?this.player_2.controls():this.player_comp.followBall(),this.config.openMenu(this)}countdown(){this.physics.pause();let e=0,t=!1;const i=["Get","Pong","Ping","Go!"],s=this.add.text(this.config.gameconf.center.width,this.config.gameconf.center.height,"",{fontSize:"128px",color:"#ffffff",strokeThickness:10}).setOrigin(.5).setAlpha(0);for(let o=0;o<i.length;o++)this.time.delayedCall(500*o,(()=>{s.setText(i[o]).setAlpha(1).setScale(.8),this.tweens.add({targets:s,scale:1,alpha:0,duration:300,ease:"Bounce.easeOut",onComplete:()=>{e+=1,console.log(o),e!==i.length||t||this.time.delayedCall(0,(()=>{t=!0,this.physics.resume()}))}})}))}gameLogic(){5!==this.config.score.p1&&5!==this.config.score.p2||(this.config.score={p1:0,p2:0},this.scene.start("GameOver")),this.ball.x<=20?(this.config.score.p2+=1,this.ball.setPosition(this.config.gameconf.center.width,this.config.gameconf.center.height),this.ball.setVelocity(this.config.ball.speed),this.addScore(this.board,2)):this.ball.x>=this.config.gameconf.width-20&&(this.config.score.p1+=1,this.ball.setPosition(this.config.gameconf.center.width,this.config.gameconf.center.height),this.ball.setVelocity(-this.config.ball.speed),this.addScore(this.board,1))}createBall(){return this.ball=this.physics.add.image(this.config.gameconf.center.width,this.config.gameconf.center.height,"ball"),this.ball.setScale(.1),this.ball.setBounce(1.1),this.ball.setVelocity(this.config.ball.speed),this.ball.setMaxVelocity(this.config.ball.max_speed),this.ball.setCollideWorldBounds(!0),this.ball.setTintFill(16777215),this.ball}createBoardGraphics(){const{width:e,height:t}=this.config.gameconf.center,i=this.add.graphics(),s=this.add.graphics(),o=this.add.text(e-90,t,"0"),n=this.add.text(e+90,t,"0");return i.lineStyle(4,2146830),i.beginPath(),i.moveTo(this.config.gameconf.center.width,0),i.lineTo(this.config.gameconf.center.width,this.config.gameconf.height),i.strokePath(),s.lineStyle(4,2146830),s.strokeCircle(this.config.gameconf.center.width,this.config.gameconf.center.height,180),o.setFill("#20c20e"),o.setFontSize("20px"),n.setFill("#20c20e"),n.setFontSize("20px"),{centerLine:i,centerCircle:s,scoreTextP1:o,scoreTextP2:n}}addScore(e,t){1===t?e.scoreTextP1.text=this.config.score.p1.toString():2===t&&(e.scoreTextP2.text=this.config.score.p2.toString())}}class r extends i.Scene{constructor(){super("GameOver"),t(this,"camera"),t(this,"background"),t(this,"gameover_text"),t(this,"config"),this.config=c.getInstance()}create(){this.add.text(this.config.gameconf.center.width,this.config.gameconf.center.height,"Game Over",{fontSize:"32px",color:"#ffffff"}).setOrigin(.5,.5),this.input.once("pointerdown",(()=>{this.scene.start("MainMenu")}))}}class d extends i.Scene{constructor(){super("MainMenu"),t(this,"background"),t(this,"logo"),t(this,"title")}create(){this.add.text(this.game.config.width/2,this.game.config.height/2,"Pong Ping",{fontSize:80,color:"#000",backgroundColor:"#20c20e"}).setOrigin(.5,.5);const e=this.add.text(this.game.config.width/2,this.game.config.height/2+60,"Press to Start",{fontSize:30,color:"#20c20e"}).setOrigin(.5,.5);e.setInteractive(),e.on("pointerdown",(()=>{this.scene.start("Game")})),e.on("pointerover",(()=>{e.setTintFill(2146830,2146830,16777215,16777215)})),e.on("pointerout",(()=>{e.setTintFill(2146830,2146830,2146830,2146830)}))}}class g extends i.Scene{constructor(){super("Preloader")}init(){this.add.rectangle(512,384,468,32).setStrokeStyle(1,2146830);const e=this.add.rectangle(282,384,4,28,2146830);this.load.on("progress",(t=>{e.width=4+460*t}))}preload(){this.load.setPath("assets")}create(){this.scene.start("MainMenu")}}const p={type:Phaser.AUTO,width:1280,height:600,scale:{},parent:"game-container",backgroundColor:"#000",scene:[o,g,d,l,r],physics:{default:"arcade"},disableContextMenu:!0},f=new i.Game(p);
