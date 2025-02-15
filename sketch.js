let mySketch = function(p) {

    let mx, my, rx = 0, ry = 0, rz = 0;
    let font, startText, menuText, TWstartText, TWmenuText, textHeight;
    let go = 1, menu = 0, keyMenu = 0, scaleMenu = 0, audioSpigot = 1;
    let wkPos, bkPos, keySize, wkeyVertOfset, bkeyVertOfset, keyVertDist, keyboardSW;

    p.preload = function() {
        font = p.loadFont('tiny5.ttf');
    }

    p.setup = function() {
        console.log("sketch enter setup");
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(30);
        p.angleMode(p.RADIANS);
        p.rectMode(p.CENTER);

        p.textFont(font);
        p.textSize(p.windowWidth / 5);
        p.textAlign(p.CENTER, p.CENTER);
        textHeight = p.windowWidth / 10;

        p.scallingAndOrientation();
        
        TWstartText = p.textWidth('start');
        TWmenuText = p.textWidth('+');
    }

    p.draw = function() {
        p.gui();

        rx = p.rotationX / p.PI;
        ry = p.rotationY / p.PI;
        rz = p.rotationZ / p.PI;
        p.rotationValueLimiter();

        // p.fill(255, 0, 0);
        // p.rect(p.windowWidth / 4, p.windowHeight / 2, 5, 0 + rx * 100);

        // p.fill(0, 0, 255);
        // p.rect(p.windowWidth - p.windowWidth / 4, p.windowHeight / 2, 5, 0 + rz * 100);

        // mx = p.map(p.mouseX, 0, p.windowWidth, 0, 1);
        // my = p.map(p.mouseY, 0, p.windowWidth, 0, 6);

        p.fill(0, 0, 255);
        p.textAlign(p.LEFT);
        p.textSize(20);
        p.text('cell.noise ++', 20, 40);
        // p.text('rx= ' + rx, 20, 80);
        // p.text('ry= ' + ry, 20, 100);
        // p.text('rz= ' + rz, 20, 120);
        // p.text('mx= ' + mx, 20, 140);
        // p.text('my= ' + my, 20, 160);
    }

    p.rotationValueLimiter = function() {
        rx = p.max(rx, 0);
        ry = p.max(ry, 0);
        rz = p.max(rz, 0);
    }

    p.scallingAndOrientation = function() {
        if (p.windowWidth <= p.windowHeight) {
            keySize = p.windowHeight / 20;
            keyboardSW = keySize / 6;
            wkeyVertOfset = p.windowHeight / 8;
            bkeyVertOfset = p.windowHeight / 6;
            keyVertDist = 1.4 * keySize;
            wkPos = p.windowWidth / 2 - keySize / 1.5;
            bkPos = p.windowWidth / 2 + keySize / 1.5;
        } else {
            keySize = p.windowHeight / 16;
            keyboardSW = keySize / 6;
            wkeyVertOfset = p.windowHeight / 8;
            bkeyVertOfset = p.windowHeight / 6;
            keyVertDist = 1.4 * keySize;
            wkPos = p.windowWidth / 2 - keySize / 1.5;
            bkPos = p.windowWidth / 2 + keySize / 1.5;
        }
    }

    p.gui = function() {
      p.background(0);

      //stop button
      p.fill(0, 0, 255);
      p.rectMode(p.CENTER);
      p.rect(p.windowWidth / 2, p.windowHeight/2, p.windowWidth / 1.7, p.windowWidth / 4.5);
      p.textSize(p.windowWidth / 5);
      p.textAlign(p.CENTER, p.CENTER);
      if (audioSpigot == 1){
        p.fill(0);
        p.text('pause', p.windowWidth / 2, p.windowHeight/2);
        sendMsgToWebPd("n_0_8", "0", [rx]);
      } else {
        rx = audioSpigot;
        p.fill(0);
        p.text('play', p.windowWidth / 2, p.windowHeight/2);
        sendMsgToWebPd("n_0_8", "0", [rx]);
      }
      sendMsgToWebPd("n_0_9", "0", [rz]);
    }  

    p.touchStarted = function() {
      p.mousePressed();
      return false;
    }

    p.touchEnded = function() {
      return false;
    }

    p.mousePressed = function() {

        //pause button
        if (go == 1 && p.mouseX > p.windowWidth / 2 - p.windowWidth / 6 && p.mouseX < p.windowWidth / 2 + p.windowWidth / 6 && p.mouseY > p.windowHeight - p.windowHeight/2 - textHeight && p.mouseY < p.windowHeight - p.windowHeight/2 + textHeight) {
            if (audioSpigot == 1){
              audioSpigot = 0;
            } else {
              audioSpigot = 1;
            }
        }
  }
}

new p5(mySketch);