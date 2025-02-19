const Counter = document.querySelector('.counter')
const Boxes = document.querySelectorAll(".box");
const IncrementButton = document.querySelector('.increment.button')
const DcrementButton = document.querySelector('.dcrement.button')
const IncrementFactorInp = document.querySelector('.increment-factor-input')
const DecrementFactorInp = document.querySelector('.decrement-factor-input')

// IncrementFactorInp.setAttribute('minlength',0)
// IncrementFactorInp.setAttribute('maxlength',Boxes.length)
// DecrementFactorInp.setAttribute('minlength',0)
// DecrementFactorInp.setAttribute('maxlength',Boxes.length)

Boxes.forEach((Box, n) => {
  CreateNums(Box, n);
});
function CreateNums(Box, n) {
  Box.innerHTML = "";
  const Nums = [];
  const NumsCon = document.createElement("div");
  NumsCon.classList.add("nums");
  Box.setAttribute("box-i", n);

  for (let i = 0; i < 10; i++) {
    const Num = document.createElement("div");
    Num.classList.add("num");
    Num.setAttribute("num-i", i);
    Num.innerHTML = `<p>${i}</p>`;
    Nums.push(Num);
  }
  NumsCon.append(...Nums);
  Box.appendChild(NumsCon);
}

let Count = 0;
let Factors = {
  increment:Number(IncrementFactorInp.value),
  decrement:Number(DecrementFactorInp.value)
}

function UpdateCounter(n = 0) {
  const PadNum = n.toString().padStart(Boxes.length, "0");
  Counter.setAttribute('count',PadNum)
  PadNum.split("").forEach((Num, i) => {
    const number = Number(Num);
    const Box = Boxes[i]
    if(!Box) return;
    const BoxNumsCon = Box.querySelector('.nums')
    const BoxBounds = BoxNumsCon.querySelector('.num').getBoundingClientRect().height
    const Translation = BoxBounds * number
    gsap.to(BoxNumsCon,{
        y:-Translation,
        duration:(Boxes.length - i) * .2 + .5,
        overwrite:true
    })
  });
}

UpdateCounter(Count);

function GetCount(n){
  let Countes = []
  for (let i = 1; i <= n; i++) {
    Countes.push(9)
  }
  return Number(Countes.join(''))
}

IncrementFactorInp.addEventListener('input', e => {
  if(e.target.value.length > Boxes.length) {
    e.target.value = Factors.increment
  } else {
    Factors.increment = Number(e.target.value)
  }
})
DecrementFactorInp.addEventListener('input', e => {
  if(e.target.value.length > Boxes.length) {
    e.target.value = Factors.decrement
  } else {
    Factors.decrement = Number(e.target.value)
  }
})

IncrementButton.addEventListener('click',e => {
    Count += Factors.increment
    Count = Count.toString().length > Boxes.length ? GetCount(Boxes.length) : Count
    UpdateCounter(Count)
})
DcrementButton.addEventListener('click',e => {
    Count -= Factors.decrement
    Count = Count < 0 ? 0 : Count
    UpdateCounter(Count)
})

window.onresize = () => UpdateCounter(Count)
