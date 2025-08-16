document.addEventListener('DOMContentLoaded',()=>{
  const ICON_SIZE=60;
  const SRC='assets/sob.png';
  const items=[];
  const center=document.querySelector('.sob-center');
  let angle=0;let last=performance.now();
  function spin(ts){const dt=ts-last;last=ts;angle=(angle+dt*0.06)%360;center.style.transform=`translate(-50%,-50%) rotate(${angle}deg)`;requestAnimationFrame(spin);}requestAnimationFrame(spin);

  // spawn icons like sprinkler
  setInterval(()=>{
    const rect=center.getBoundingClientRect();
    const r=rect.width/2;
    const rad=(angle+90)*Math.PI/180;
    const x=rect.left+r+r*Math.cos(rad)-ICON_SIZE/2;
    const y=rect.top +r+r*Math.sin(rad)-ICON_SIZE/2;

    const img=document.createElement('img');
    img.src=SRC;img.className='sob-small';document.body.appendChild(img);
    const speed=1+Math.random()*3;
    const vx=Math.cos(rad)*speed;
    const vy=Math.sin(rad)*speed;
    items.push({img,x,y,vx,vy});
  },120); // fire rate

  function step(){
    const W=innerWidth;const H=innerHeight;
    items.forEach(it=>{
      if(it.x<=0||it.x+ICON_SIZE>=W)it.vx*=-1;
      if(it.y<=40||it.y+ICON_SIZE>=H)it.vy*=-1;
      it.x+=it.vx;it.y+=it.vy;it.img.style.transform=`translate(${it.x}px,${it.y}px)`;});
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
});
