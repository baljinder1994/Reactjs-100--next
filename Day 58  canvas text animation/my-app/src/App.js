import React, { useEffect, useRef } from 'react'

function App(){
  const canvasRef=useRef(null);
  const particles=useRef([])

  useEffect(() =>{
    const canvas=canvasRef.current;
    const ctx=canvas.getContext('2d');

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    function createP(){
       const size=Math.random() * 20 + 10;
       const x=Math.random() * canvas.width
       const y=Math.random() * canvas.height;
       const dx=(Math.random() - 0.5) * 2;
       const dy=(Math.random() - 0.5) * 2;
       const text='CANVAS ANIMATION';
       const color=`hsl(${Math.random() * 360}, 100%, 50%)`

       particles.current.push({x,y,dx,dy,size,text,color})
    }
    function animate(){
      requestAnimationFrame(animate);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.current.forEach(particle=>{
        particle.x += particle.dx;
        particle.y += particle.dy;

        //Draw PArticles
        ctx.fillStyle=particle.color;
        ctx.font=`${particle.size}px Arial`;
        ctx.fillText(particle.text,particle.x,particle.y);

        if(particle.x > canvas.width || particle.x < 0){
          particle.dx = -particle.dx;
        }
        if(particle.y > canvas.height || particle.y < 0){
          particle.dy = -particle.dy;
        }
      })
    }
    function handleResize(){
      canvas.width=window.innerWidth;
      canvas.height=window.innerHeight;
    }
    window.addEventListener('resize',handleResize)
    for(let i=0;i<100;i++){
      createP()
    }
    animate()
    return () =>{
      window.removeEventListener('resize',handleResize)
      cancelAnimationFrame(animate)
    }



  },[])

{
 return <canvas ref={canvasRef} style={{backgroundColor:'#000'}}></canvas>
}
}
export default App