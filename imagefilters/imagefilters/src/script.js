
var img=null;
var ic=document.getElementById("can");
var f1=document.getElementById("upd");
function upload(){
  img=new SimpleImage(f1);
  grIm = new SimpleImage(f1);
  rdIm = new SimpleImage(f1);
  gnIm = new SimpleImage(f1);
  blIm = new SimpleImage(f1);
  rnbwIm = new SimpleImage(f1);
  blrIm = new SimpleImage(f1);
  img.drawTo(ic);
}
function imageIsLoaded(im)
{
  if(im == null || ! im.complete())
    {
      alert("image is not loaded");
    }
  return im;
  
}
function grfil() {
  //change all pixels of image to gray
  for (var pixel of grIm.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
 
}
function makeGray()
{
  if(imageIsLoaded(grIm))
    {
      grfil();
      grIm.drawTo(ic);
    }
}
function rdfil()
{
  for(var pixel of rdIm.values())
  {
    var avg = (pixel.getRed()+ pixel.getGreen() + pixel.getBlue())/3;
     if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
}
function redfilter()
{
  if(imageIsLoaded(rdIm))
    {
      rdfil();
      rdIm.drawTo(ic);
    }
}
function gnfil()
{
  for(var pixel of gnIm.values())
  {
    var avg = (pixel.getRed()+ pixel.getGreen() + pixel.getBlue())/3;
     if (avg < 128) {
      pixel.setGreen(2 * avg);
      pixel.setRed(0);
      pixel.setBlue(0);
    } else {
      pixel.setGreen(255);
      pixel.setRed(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
}
function grfilter()
{
  if(imageIsLoaded(gnIm))
    {
      gnfil();
      gnIm.drawTo(ic);
    }
}
function blfil()
{
  for(var pixel of blIm.values())
  {
    var avg = (pixel.getRed()+ pixel.getGreen() + pixel.getBlue())/3;
     if (avg < 128) {
      pixel.setBlue(2 * avg);
      pixel.setGreen(0);
      pixel.setRed(0);
    } else {
      pixel.setBlue(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setRed(2 * avg - 255);
    }
  }
}
function blfilter()
{
  if(imageIsLoaded(blIm))
    {
      blfil();
      blIm.drawTo(ic);
    }
}
function filterRainbow() {
  var height = rnbwIm.getHeight();
  for (var pixel of rnbwIm.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (y < height / 7) {
      //red
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 2 / 7) {
      //orange
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 3 / 7) {
      //yellow
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 4 / 7) {
      //green
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 5 / 7) {
      //blue
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y < height * 6 / 7) {
      //indigo
      if (avg < 128) {
        pixel.setRed(.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else {
      //violet
      if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      } else {
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4*avg+153);
      }
    }
  }
}
function rnbwfilter()
{
  if(imageIsLoaded(rnbwIm))
  {
     filterRainbow();
    rnbwIm.drawTo(ic);
     }
}
function filterBlur() {
    for(var pixel of blrIm.values()){
      var x= pixel.getX();
      var y= pixel.getY();
      rand= Math.random();
      if(rand < 0.6) {
        blrIm.setPixel(x,y,pixel);
      }
    else {
      nearByPixel(x,y);
    }   
  }
}  

function nearByPixel(x,y) {
  var w = blrIm.getWidth();
  var h = blrIm.getHeight();
  var tempx = x + Math.floor(5*rand);
  var tempy = y + Math.floor(5*rand);
  if (tempx >= w) {
    tempx = w - Math.floor(5*rand) - 1;
  }
  if (tempy >= h) {
    tempy = h- Math.floor(5*rand) - 1;
  }
  var newPixel = blrIm.getPixel(tempx, tempy);
  blrIm.setPixel(x,y,newPixel);
}

function doBlur(){
  if(imageIsLoaded(blrIm)) {
    filterBlur();
    blrIm.drawTo(ic);
  }
}
function doreset()
{
  img.drawTo(ic);
}