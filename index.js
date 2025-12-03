const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// variables
let mouseX,mouseY
let speed = 0
let gameEnd = false
let playerMove
let compMove
const centres = [ {x:412,y:150},{x:512,y:150},{x:612,y:150},
                  {x:412,y:250},{x:512,y:250},{x:612,y:250},
                  {x:412,y:350},{x:512,y:350},{x:612,y:350} ]


class X{
  constructor(position)
  {
    this.position = position
    this.growthSpeed = 0

  }
  draw()
  {
    c.beginPath()
    c.strokeStyle = 'red'
    c.lineWidth = 5
    c.moveTo(this.position.x-20*this.growthSpeed,this.position.y-this.growthSpeed*20)
    c.lineTo(this.position.x+20*this.growthSpeed,this.position.y+20*this.growthSpeed)
    c.stroke()
    c.closePath()

    c.beginPath()
    c.strokeStyle = 'red'
    c.lineWidth = 5
    c.moveTo(this.position.x+20*this.growthSpeed,this.position.y-20*this.growthSpeed)
    c.lineTo(this.position.x-20*this.growthSpeed,this.position.y+20*this.growthSpeed)
    c.stroke()
    c.closePath()
    if(this.growthSpeed<1)
    {
      this.growthSpeed+=0.05
    }
  }
  returnCenter()
  {
    return {x:this.position.x,y:this.position.y}
  }
}
class Circle
{
  constructor(position)
  {
    this.position = position
      this.growthSpeed = 0
  }
  draw()
  {
    c.beginPath()
    c.strokeStyle = 'white'
    //c.strokeWidth = 10
    c.arc(this.position.x,this.position.y,20*this.growthSpeed,0,Math.PI*2)
    c.stroke()
    c.closePath()
    if(this.growthSpeed<1)
    {
      this.growthSpeed+=0.2
    }

  }
  returnCenter()
  {
    return {x:this.position.x,y:this.position.y}
  }
}
const circles = []
const xS = []
const winLines = [{a:centres[0],b:centres[1],c:centres[2]},{a:centres[0],b:centres[3],c:centres[6]},{a:centres[0],b:centres[4],c:centres[8]},
              {a:centres[8],b:centres[5],c:centres[2]},{a:centres[8],b:centres[7],c:centres[6]},{a:centres[1],b:centres[4],c:centres[7]},
            {a:centres[3],b:centres[4],c:centres[5]},{a:centres[2],b:centres[4],c:centres[6]}]

turn = true;
function animate()
{
  let x,y
  window.requestAnimationFrame(animate)
  c.fillStyle = 'orange'
  c.fillRect(0,0,canvas.width,canvas.height)

  c.beginPath()
  c.strokeStyle = 'white'
  c.lineWidth = 2
  c.moveTo(462,100)
  c.lineTo(462,400)
  c.stroke()

  c.beginPath()
  c.strokeStyle = 'white'
  c.lineWidth = 2
  c.moveTo(562,100)
  c.lineTo(562,400)
  c.stroke()

  c.beginPath()
  c.strokeStyle = 'white'
  c.lineWidth = 2
  c.moveTo(362,200)
  c.lineTo(662,200)
  c.stroke()

  c.beginPath()
  c.strokeStyle = 'white'
  c.lineWidth = 2
  c.moveTo(362,300)
  c.lineTo(662,300)
  c.stroke()

  for(let i=0;i<9;i++)
  {
    if(Math.abs(centres[i].x-mouseX)<=50&&Math.abs(centres[i].y-mouseY)<=50&&turn&&xS[i]==null&&!gameEnd)
    {
       x = centres[i].x
      y = centres[i].y
      circles[i] = new Circle({x:x,y:y})
      mouseX = 0
      mouseY = 0
      turn = false
      break;
    }
  /*  else if (Math.abs(centres[i].x-mouseX)<=50&&Math.abs(centres[i].y-mouseY)<=50&&!turn&&circles[i]==null) {
      x = centres[i].x
     y = centres[i].y
     xS[i] = new X({x:x,y:y})
     mouseX = 0
     mouseY = 0
     turn = true

     break;
   }*/
  }
  //strikeThrough(412,150)
  Computer()

//console.log(turn)

  circles.forEach((circle) => {
    circle.draw()
  });
  xS.forEach((xs) => {
    xs.draw()
  });

}

function strikeThrough(start,end)
{
  //const start = {x:posX,y:posY}
  //const end = {x:posX+200,y:posY}

  const currX = start.x + (end.x-start.x)*speed
  const currY = start.y + (end.y-start.y)*speed

  c.beginPath()
  c.strokeStyle = 'blue'
  c.lineWidth  = 3;
  c.moveTo(start.x,start.y)
  c.lineTo(currX,currY)
  c.stroke()
  c.closePath()
  if(speed<1)
  {
    speed+=0.05
  }
}

function Computer()
{
  //console.log('hello')
  const oLines = [{a:circles[0],b:circles[1],c:circles[2]},{a:circles[0],b:circles[3],c:circles[6]},{a:circles[0],b:circles[4],c:circles[8]},
                {a:circles[8],b:circles[5],c:circles[2]},{a:circles[8],b:circles[7],c:circles[6]},{a:circles[1],b:circles[4],c:circles[7]},
              {a:circles[3],b:circles[4],c:circles[5]},{a:circles[2],b:circles[4],c:circles[6]}]
  const xLines = [{a:xS[0],b:xS[1],c:xS[2]},{a:xS[0],b:xS[3],c:xS[6]},{a:xS[0],b:xS[4],c:xS[8]},
                  {a:xS[8],b:xS[5],c:xS[2]},{a:xS[8],b:xS[7],c:xS[6]},{a:xS[1],b:xS[4],c:xS[7]},
                  {a:xS[3],b:xS[4],c:xS[5]},{a:xS[2],b:xS[4],c:xS[6]}]
  for(let i=0;i<8;i++)
  {
    if(oLines[i] &&oLines[i].a && oLines[i].b && oLines[i].c)
    {
    strikeThrough({x:oLines[i].a.returnCenter().x,y:oLines[i].a.returnCenter().y},{x:oLines[i].c.returnCenter().x,y:oLines[i].c.returnCenter().y})
    gameEnd = true
    //console.log(lines[i].a.returnCenter())
    }
    else if(xLines[i] &&xLines[i].a && xLines[i].b && xLines[i].c)
    {
    strikeThrough({x:xLines[i].a.returnCenter().x,y:xLines[i].a.returnCenter().y},{x:xLines[i].c.returnCenter().x,y:xLines[i].c.returnCenter().y})
    gameEnd = true
    //console.log(lines[i].a.returnCenter())
    }
    if( xLines[i].a && xLines[i].b && !xLines[i].c &&!turn&&xS[centres.indexOf(winLines[i].c)]==null&&circles[centres.indexOf(winLines[i].c)]==null)
    {
      xS[centres.indexOf(winLines[i].c)] = new X({x:winLines[i].c.x,y:winLines[i].c.y})
      mouseX = 0
      mouseY = 0
      turn = true
      console.log(i)

    //  break;
    }
    else if( !xLines[i].a && xLines[i].b && xLines[i].c &&!turn&&xS[centres.indexOf(winLines[i].a)]==null&&circles[centres.indexOf(winLines[i].a)]==null)
    {
      xS[centres.indexOf(winLines[i].a)] = new X({x:winLines[i].a.x,y:winLines[i].a.y})
      mouseX = 0
      mouseY = 0
      turn = true
      //console.log(2)

    //  break;
    }
    else if( xLines[i].a && !xLines[i].b && xLines[i].c&&!turn &&xS[centres.indexOf(winLines[i].b)]==null&&circles[centres.indexOf(winLines[i].b)]==null)
    {
      xS[centres.indexOf(winLines[i].b)] = new X({x:winLines[i].b.x,y:winLines[i].b.y})
      mouseX = 0
      mouseY = 0
      turn = true
      //console.log(3)
    //  break;
    }
  }
  for(let i=0;i<8;i++){

     if( oLines[i].a && oLines[i].b && !oLines[i].c &&!turn&&xS[centres.indexOf(winLines[i].c)]==null&&circles[centres.indexOf(winLines[i].c)]==null)
    {
      xS[centres.indexOf(winLines[i].c)] = new X({x:winLines[i].c.x,y:winLines[i].c.y})
      mouseX = 0
      mouseY = 0
      turn = true
    //console.log('hello')

    //  break;
    }
    else if( !oLines[i].a && oLines[i].b && oLines[i].c &&!turn&&xS[centres.indexOf(winLines[i].a)]==null&&circles[centres.indexOf(winLines[i].a)]==null)
    {
      xS[centres.indexOf(winLines[i].a)] = new X({x:winLines[i].a.x,y:winLines[i].a.y})
      mouseX = 0
      mouseY = 0
      turn = true
      //console.log(2)

    //  break;
    }
    else if( oLines[i].a && !oLines[i].b && oLines[i].c&&!turn &&xS[centres.indexOf(winLines[i].b)]==null&&circles[centres.indexOf(winLines[i].b)]==null)
    {
      xS[centres.indexOf(winLines[i].b)] = new X({x:winLines[i].b.x,y:winLines[i].b.y})
      mouseX = 0
      mouseY = 0
      turn = true
    //  console.log(3)
    //  break;
    }
  }

    //let randomIndex = Math.random(0,9)
  //  let randomPos = {x:centres[randomIndex].x,y:centres[randomIndex].y}

  for(let i=0;i<9;i++)
  {
     if(xS[i]==null &&circles[i]==null&&!turn)
    {
      xS[i] = new X({x:centres[i].x,y:centres[i].y})
      mouseX = 0
      mouseY = 0
      turn = true
    }
  }
  //zero

}
animate()

window.addEventListener('click',(event)=>{
  mouseX = event.x;
  mouseY = event.y
  console.log(mouseX,mouseY)
})
