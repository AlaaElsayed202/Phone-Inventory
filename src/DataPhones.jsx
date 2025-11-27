import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';

import '@sweetalert2/theme-dark/dark.css';
export default function DataPhones() {
    const [Phones, setPhones] = useState(JSON.parse(localStorage.getItem('Phones'))|| []);

    const RemovePhone = (index) => {
  let Copy = [...Phones];

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    background: "#1e1e1e",
    color: "#ffffff"
  }).then((result) => {
    if (result.isConfirmed) {
      
      Copy.splice(index, 1);
      setPhones(Copy);
      localStorage.setItem('Phones', JSON.stringify(Copy));

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        background: "#1e1e1e",
        color: "#ffffff"
      });
    }
  });
};

      
    

    const [NewPhoneModelIndex,setNewPhoneModelIndex] = useState(false)

    const nameInput =  useRef();
     const priceInput =  useRef();
      const qtyInput =  useRef();

      const AddNewPhone = () => {
        let newphone = {Name:nameInput.current.value ,
                        Price:+priceInput.current.value ,
                        Qty:+qtyInput.current.value};
        let copy = [...Phones];
         copy.push(newphone);
         setPhones(copy);
        Swal.fire({
          theme:'dark',
  title: "Phone Added",
  icon: "success",
  draggable: true
});
         setNewPhoneModelIndex(false);
         localStorage.setItem('Phones',JSON.stringify(copy));
      }

      const [EditPhoneIndex, setEditPhoneIndex] = useState();
      const OpenEditPhone = (index)=> {
        setEditPhoneIndex(index);
      document.getElementById('my_modal_1').showModal()
        let oldData = Phones[index]
       nameInput.current.value  = oldData.Name;
       priceInput.current.value = oldData.Price;
       qtyInput.current.value = oldData.Qty;

      };

      const SaveNewData = () => {
         let NewPhoneData = {
          Name:nameInput.current.value  ||0,
          Price:+priceInput.current.value ||0,
          Qty:+qtyInput.current.value||0
        };
        let copy = [...Phones];
            copy[EditPhoneIndex] = NewPhoneData;
            setPhones(copy);
            localStorage.setItem('Phones',JSON.stringify(copy));

        Swal.fire({
           background: "#1e1e1e",
      color: "#ffffff",
  title: "Phone Edited",
  icon: "success",
  draggable: true
});
         setNewPhoneModelIndex(false);
         
      };
  return (

  <div className='bg-black min-h-screen pt-8 px-9'>
    <button className="btn btn-accent" onClick={()=>setNewPhoneModelIndex(true)}>Add Phones</button>
 <table className="w-full  text-white border border-gray-700 mt-7 ">
  <thead className="bg-black ">
    <tr>
      <th className="p-3 border border-gray-700">#</th>
      <th className="p-3 border border-gray-700">Item Name</th>
      <th className="p-3 border border-gray-700">Item Price</th>
      <th className="p-3 border border-gray-700">Item Qty</th>
      <th className="p-3 border border-gray-700">Item Total</th>
      <th className="p-3 border border-gray-700"> Action</th>
    </tr>
  </thead>

  <tbody>
    {Phones.map((el, index) => (
      <tr key={index} className="odd:bg-[#0a0a0a] even:bg-[#111] text-center">
        <td className="p-3 border border-gray-700">{index + 1}</td>
        <td className="p-3 border border-gray-700">{el.Name}</td>
        <td className="p-3 border border-gray-700">{el.Price}</td>
        <td className="p-3 border border-gray-700">{el.Qty}</td>
        <td className="p-3 border border-gray-700">{el.Price * el.Qty}</td>

         <td className="p-3 border border-gray-700 flex gap-2 justify-center">

        <button className="btn btn-secondary"  onClick={()=>OpenEditPhone(index)}>
          Edit
        </button>

        <button  className="btn btn-warning" onClick={() => RemovePhone(index)}  >  Remove </button>

      </td>
      </tr>
    ))}
  </tbody>
</table>
 {NewPhoneModelIndex ? (
  
  <div   className="fixed inset-0 bg-black/70 flex justify-center items-center animate__animated animate__fadeIn" onClick={() => setNewPhoneModelIndex(false)}>
  
    <div className="w-[500px] p-4 rounded bg-gray-700 shadow border flex flex-col items-center justify-center gap-4 animate__animated animate__slideInDown animate__slow"
        onClick={(event) => event.stopPropagation()}  >
          
      <h1 className="text-amber-50 text-xl mb-4 text-center">Add New Phone</h1>

      <input type="text" ref={nameInput} className="w-full input mb-3" placeholder="Enter New Phone Name"/>
      <input type="number" ref={priceInput} className="w-full input mb-3" placeholder="Enter New Phone Price"/>
      <input type="number"  ref={qtyInput} className="w-full input mb-3" placeholder="Enter New Phone Qty"/>

      <button className="btn btn-primary w-full" onClick={AddNewPhone}>Add New Phone</button>
    </div>
  </div>

):null}
     
<dialog id="my_modal_1" className=" modal fixed inset-0 bg-black/70 flex justify-center items-center animate__animated animate__fadeIn " onClick={()=> document.querySelector('#my_modal_1').close() } >
  <div className="modal-box  w-[500px] p-4 rounded bg-gray-700 shadow border flex flex-col items-center justify-center gap-4 animate__animated animate__slideInDown animate__slow" onClick={(event)=> event.stopPropagation(false) }> 
    <h3 className="font-bold text-lg text-amber-50">Edit Phone Data</h3>

    <div className="modal-action ">
      <form method="dialog" >
        <input type="text" ref={nameInput} className="w-full input mb-3" placeholder="Enter New Phone Name"/>
      <input type="number" ref={priceInput} className="w-full input mb-3" placeholder="Enter New Phone Price"/>
      <input type="number"  ref={qtyInput} className="w-full input mb-3" placeholder="Enter New Phone Qty"/>

        <button className="btn btn-primary w-full" onClick={SaveNewData}>Save</button>
      </form>
    </div>
  </div>
</dialog>

  </div>
  )
}
