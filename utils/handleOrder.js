const orderedRadio = document.getElementById("ordered")
const orderConfirmedRadio = document.getElementById("order_confirmed")
const pickedByCourierRadio = document.getElementById("picked_by_courier")
const onTheWayRadio = document.getElementById("on_the_way")
const readyForPickupRadio = document.getElementById("ready_for_pickup")
const orderID = document.getElementById("orderID");
const ID = orderID.value;
orderedRadio.addEventListener('click', ()=>{
    setStatus(ID,orderedRadio.value)
})
orderConfirmedRadio.addEventListener('click', ()=>{
    setStatus(ID,orderConfirmedRadio.value)
})
pickedByCourierRadio.addEventListener('click', ()=>{
    setStatus(ID,pickedByCourierRadio.value)
})
onTheWayRadio.addEventListener('click', ()=>{
    setStatus(ID,onTheWayRadio.value)
})
readyForPickupRadio.addEventListener('click', ()=>{
    setStatus(ID,readyForPickupRadio.value)
})
function setStatus(id, status) {
    const data = {
       id,
       status,
    };
    $.ajax({
        url: '/order/setStatus',
        type: 'POST',  // http method
        data: data,  // data to submit
        success: function (dat) { // after success your get data
          
        }
      });
}