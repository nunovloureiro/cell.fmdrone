// document.addEventListener('touchstart', {});

// function handleTouchStart(event) {
//     console.log('Touch started!', event);
// }

let mySketch = function(p) {
    // const WHITE_KEYS = 7;
    // const BLACK_KEYS = 6; // Excluding the 3rd black key

    

    let mx, my, rx = 0, ry = 0, rz = 0;
    let font, startText, menuText, TWstartText, TWmenuText, textHeight;
    let go = 1, menu = 0, keyMenu = 0, scaleMenu = 0, audioSpigot = 1;
    let wkPos, bkPos, keySize, wkeyVertOfset, bkeyVertOfset, keyVertDist, keyboardSW;
    let teclasBrancas = [], teclasPretas = [], teclado = [], keyID;
    let octave = 0;

    p.preload = function() {
        font = p.loadFont('tiny5.ttf');
    }

    p.setup = function() {
        console.log("sketch enter setup");
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(15);
        p.angleMode(p.RADIANS);
        p.rectMode(p.CENTER);

        p.textFont(font);
        p.textSize(p.windowWidth / 5);
        p.textAlign(p.CENTER, p.CENTER);
        textHeight = p.windowWidth / 10;

        p.scallingAndOrientation();
        p.initKeyboard();
        hitKey = teclasBrancas[0];
        hitKey.selected = 0; // Highlight the selected key

        TWstartText = p.textWidth('start');
        TWmenuText = p.textWidth('+');

        // if (isIOSToggle){
        //   p.touchStarted();
        // }


    }

    p.draw = function() {
        

        rx = p.rotationX / p.PI;
        ry = p.rotationY / p.PI;
        rz = p.rotationZ / p.PI;
        p.rotationValueLimiter();

        p.gui();

        // p.fill(255, 0, 0);
        // p.rect(p.windowWidth / 4, p.windowHeight / 2, 5, 0 + rx * 100);

        // p.fill(0, 0, 255);
        // p.rect(p.windowWidth - p.windowWidth / 4, p.windowHeight / 2, 5, 0 + rz * 100);

        // mx = p.map(p.mouseX, 0, p.windowWidth, 0, 1);
        // my = p.map(p.mouseY, 0, p.windowWidth, 0, 6);

        p.fill(0, 0, 255);
        p.textAlign(p.LEFT);
        p.textSize(20);
        p.text('cell.fm_drone +++', 20, 40);
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

        if (go == 1 && menu == 0 && keyMenu == 0) {
            p.background(0);
            p.fill(0, 0, 255);
            p.rectMode(p.CENTER);
            p.rect(p.windowWidth / 2, p.windowHeight / 2, p.windowWidth / 5, p.windowWidth / 5);
            p.fill(0);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(p.windowWidth / 5);
            p.text('+', p.windowWidth / 2, p.windowHeight / 2);
            
            //stop button
            p.fill(0, 0, 255);
            p.rect(p.windowWidth / 2, p.windowHeight - p.windowHeight / 3.05, p.windowWidth / 1.7, p.windowWidth / 4.5);

            if (audioSpigot == 1){
              p.fill(0);
              p.text('pause', p.windowWidth / 2, p.windowHeight - p.windowHeight / 3 );
              sendMsgToWebPd("n_0_8", "0", [rx]);
            } else {
              rx = audioSpigot;
              p.fill(0);
              p.text('play', p.windowWidth / 2, p.windowHeight - p.windowHeight / 3 );
              sendMsgToWebPd("n_0_8", "0", [rx]);
            }
            

            //octave button
            p.fill(0, 0, 255);
            p.rect(p.windowWidth / 2, p.windowHeight - p.windowHeight / 5.05, p.windowWidth / 1.3, p.windowWidth / 4.5);

            if (octave == 1){
              p.fill(0);
              p.text('- oct', p.windowWidth / 2, p.windowHeight - p.windowHeight / 5 );

              sendMsgToWebPd("n_0_31", "0", [octave]);
              console.log(octave);
            } else {
              p.fill(0);
              p.text('+ oct', p.windowWidth / 2, p.windowHeight - p.windowHeight / 5 );
              octave = 0;
              sendMsgToWebPd("n_0_31", "0", [octave]);
              console.log(octave);
            }
            
            sendMsgToWebPd("n_0_9", "0", [rz]);
        }

        if (go == 1 && menu == 1 && keyMenu == 0) {
            p.background(0, 0, 255);
            p.fill(0);
            p.textSize(p.windowWidth / 5);
            p.textAlign(p.CENTER, p.CENTER);
            p.text('key', p.windowWidth / 2, p.windowHeight / 2 - p.windowHeight / 8 - textHeight);
            // p.text('scale', p.windowWidth / 2, p.windowHeight / 2);
            p.textSize(p.windowWidth / 5);
            p.text('x', p.windowWidth / 2, p.windowHeight / 2 + p.windowHeight / 8 + textHeight);
        }

        if (go == 1 && menu == 0 && keyMenu == 1) {
            p.background(0, 0, 255);
            p.showKeyboard();

            p.noStroke();
            p.fill(0);
            p.textSize(p.windowWidth / 5);
            p.textAlign(p.CENTER, p.CENTER);
            p.text('x', p.windowWidth / 2, p.windowHeight - p.windowHeight / 10);
        }
    }

    p.touchStarted = function() {
      p.mousePressed();
      return false;
    }

    p.touchEnded = function() {
      return false;
    }

    p.mousePressed = function() {
        //go to menu
        if (go == 1 && menu == 0 && keyMenu == 0 && scaleMenu == 0 && p.mouseX > p.windowWidth / 2 - p.windowWidth / 10 && p.mouseX < p.windowWidth / 2 + p.windowWidth / 10 && p.mouseY > p.windowHeight / 2 - textHeight && p.mouseY < p.windowHeight / 2 + textHeight) {
            menu = 1;
            return;
        }

        //pause button
        if (go == 1 && menu == 0 && keyMenu == 0 && scaleMenu == 0 && p.mouseX > p.windowWidth / 2 - p.windowWidth / 6 && p.mouseX < p.windowWidth / 2 + p.windowWidth / 6 && p.mouseY > p.windowHeight - p.windowHeight / 3.05 - textHeight && p.mouseY < p.windowHeight - p.windowHeight / 3.05 + textHeight) {
            if (audioSpigot == 1){
              audioSpigot = 0;
            } else {
              audioSpigot = 1;
            }
        }
        
        //octave button
        if (go == 1 && menu == 0 && keyMenu == 0 && scaleMenu == 0 && p.mouseX > p.windowWidth / 2 - p.windowWidth / 5 && p.mouseX < p.windowWidth / 2 + p.windowWidth / 5 && p.mouseY > p.windowHeight - p.windowHeight / 5.05 - textHeight && p.mouseY < p.windowHeight - p.windowHeight / 5.05 + textHeight) {
          if (octave == 1){
            octave = 0;
          } else {
            octave = 1;
          }
      }        

        //go to key
        if (go == 1 && menu == 1 && keyMenu == 0 && scaleMenu == 0 && p.mouseX > p.windowWidth / 2 - p.windowWidth / 10 && p.mouseX < p.windowWidth / 2 + p.windowWidth / 10 && p.mouseY > p.windowHeight / 2 - p.windowHeight / 8 - textHeight && p.mouseY < p.windowHeight / 2 - p.windowHeight / 8 + 2 * textHeight) {
            menu = 0;
            keyMenu = 1;
            return;
        }
        //exit from menu button
        if (go == 1 && menu == 1 && keyMenu == 0 && scaleMenu == 0 && p.mouseX > p.windowWidth / 2 - p.windowWidth / 8 && p.mouseX < p.windowWidth / 2 + p.windowWidth / 8 && p.mouseY > p.windowHeight / 2 + p.windowHeight / 8 - textHeight / 2 && p.mouseY < p.windowHeight / 2 + p.windowHeight / 8 + 2 * textHeight) {
            menu = 0;
            go = 1;
            keyMenu = 0;
            return;
        }


        //select key button
        if (keyMenu == 1 && menu == 0 && scaleMenu == 0) {
            let newHitKey = null;
            for (let i = 0; i < teclasBrancas.length; i++) {
                if (teclasBrancas[i].isClicked()) {
                    newHitKey = teclasBrancas[i];
                    break;
                }
            }
            if (!newHitKey) {
                for (let i = 0; i < teclasPretas.length; i++) {
                  if(i == 2){
                    continue;
                  } else {
                    if (teclasPretas[i].isClicked()) {
                        newHitKey = teclasPretas[i];
                        break;
                    }
                  }
                }
            }
            // Only update selection if a key was actually clicked.
            if (newHitKey) {
                teclasBrancas.forEach(key => key.selected = 255);
                for (let i = 0; i < teclasPretas.length; i++) {
                  if(i == 2){
                      continue;
                  } else {
                      teclasPretas[i].selected = 255;
                    }
                  }
                hitKey = newHitKey;
                hitKey.selected = 0;
                console.log('Key pressed:', hitKey.w_b, hitKey.keyID);
                let key2pd = 10 * hitKey.w_b + hitKey.keyID;
                console.log(key2pd);
                sendMsgToWebPd("n_0_28", "0", [key2pd]);
            }


            //exit button keymenu
            if (p.mouseX > p.windowWidth / 2 - p.windowWidth / 10 && p.mouseX < p.windowWidth / 2 + p.windowWidth / 10 && p.mouseY > p.windowHeight - 2 * p.windowHeight / 10 && p.mouseY < p.windowHeight + 2 * p.windowHeight / 10) {
                keyMenu = 0;
                menu = 0;
                go = 1;
            }
        }
    }

    p.initKeyboard = function() {
        for (let i = 0; i < 7; i++) {
            teclasBrancas[i] = new p.kbKey(wkPos, wkeyVertOfset + i * keyVertDist, keySize, keyboardSW, 0, i);
        }
        for (let i = 0; i < 6; i++) {
          if (i != 2) {
            teclasPretas[i] = new p.kbKey(bkPos, bkeyVertOfset + i * keyVertDist, keySize, keyboardSW, 1, i);
          } else {continue};
        }
    }

    p.showKeyboard = function() {
        p.background(0, 0, 255);
        p.rectMode(p.CENTER);
        p.strokeWeight(keyboardSW);
        p.stroke(0);
        p.fill(0, 0, 255);

        teclasBrancas.forEach(key => key.show());
        for (let i = 0; i < 6; i++){
          if (i == 2){
           } else {
             teclasPretas[i].show();
            }
         }
    }

    p.scaleButton = class {
      constructor(x, y, scaleNumber, scales){
        this.x = x;
        this.y = y;
        this.scaleNumber = scaleNumber;
        this.scale = scales;
        this.scaleName = this.scale[scaleNumber];

        this.scaleNameWidth = p.textWidth(this.scaleName);
        this.scaleNameHeight = p.textAscent();
            
        // Set the "maj pent" scale (index 1) as selected by default.
        this.selected = (scaleNumber === 1) ? 1 : 0;
      }

      show() {
        if (this.selected == 1){
          p.rectMode(p.CENTER);
          p.fill(0);
          p.rect(this.x, this.y + p.windowHeight / 60, this.scaleNameWidth + this.scaleNameWidth / 5, this.scaleNameHeight + this.scaleNameHeight / 5);
          p.noStroke();
          p.fill(0,0,255);
        } else {
          p.noStroke();
          p.fill(0);
        }
        p.text(this.scaleName, this.x, this.y);

      }

      isClicked() {
        return (
            p.mouseX > this.x - this.scaleNameWidth / 2 &&
            p.mouseX < this.x + this.scaleNameWidth / 2 &&
            p.mouseY > this.y - this.scaleNameHeight / 2 &&
            p.mouseY < this.y + this.scaleNameHeight / 2
        );
    }
  }

    p.kbKey = class {
        constructor(x, y, keySize, keyboardSW, w_b, keyID) {
            this.x = x;
            this.y = y;
            this.keySize = keySize;
            this.keySW = keyboardSW;
            this.keyID = keyID;
            this.w_b = w_b;
            this.selected = 255;
        }

        show() {
            p.strokeWeight(this.keySW);
            p.stroke(0);
            p.fill(0, 0, this.selected);
            p.square(this.x, this.y, this.keySize);
        }

        isClicked() {
            return (
                p.mouseX > this.x - this.keySize / 2 &&
                p.mouseX < this.x + this.keySize / 2 &&
                p.mouseY > this.y - this.keySize / 2 &&
                p.mouseY < this.y + this.keySize / 2
            );
        }
    }
}

new p5(mySketch);