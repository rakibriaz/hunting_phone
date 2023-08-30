const landPhone = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
        .catch((err => console.log(err)))
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones)
}
// ডিসপ্লে ফোন নামে নতুন একটি ফাংশন ডিকলার করতে হবে। কারণ এখানে ফর ইচ লুপ চালনো হবে এবং প্রতিটি ফোনকে দেখানো হবে। ফাংশনটি আবার উপরে ল্যন্ড ফোনে কল করে দিতে হবে নচেৎ কাজ হবে না। 

const displayPhones = (phones) => {

//    লুপের বাইরে ফোনের কনটেইনার আইডি সেট করতে হবে বা নিয়ে আসতে হবে। 
    const phoneContainer = document.getElementById("phone-container")
    // ডাটা ক্লিয়ার করতে হবে। অর্থ্যাৎ সার্চ দিলে যেন এক জিনিস বার বার না আসে। 
        phoneContainer.textContent = ""

        console.log(phones.length)
    
    // এবার সার্চ দিলে খুব কম সংখ্যক অর্থ্যাৎ ১২টা শুধু ফোন দেখাবো। কিন্তু সার্চ দিলে কনসল লগে সব রেজাল্ট দেখায় আর ডিসপ্লেতে শুধু বারোটা দেখায়। তাই একটা শো অল বাটন নিয়ে কল করে দেবো যাতে সবগুলো ডাটা দেখায়। 

        const showAllButton = document.getElementById("show-all")
        if(phones.length>12){
            showAllButton.classList.remove("hidden")
        }else{
            showAllButton.classList.add("hidden")
        }

        phones = phones.slice(0, 12)
   
    phones.forEach((phone) => {
        console.log(phone)

        // এবার একটা নতুন ডিভ তৈরি করতে হবে এবং সে ডিভে সব ক্লাস এড করতে হবে।  
        const phoneCard = document.createElement("div") 
        phoneCard.classList = `card bg-gray-300 shadow-xl p-4`

        // এরপর কার্ডে কি কি বসবে সেগুলো সেট করতে হবে। অর্থ্যাৎ ইনার এইচ টি এম এল সেট করতে হবে। 
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
        `;

        // এরপর এপেন্ড চাইল্ড করে দিতে হবে। অর্থ্যাৎ পিতাকে কল করতে হবে।
        phoneContainer.appendChild(phoneCard)
        
    })
    loadingSpinner(false)
}

// এবার এখানে বাটন কে অন ক্লিক হিসেবে কল করলাম এবং সার্চ এর মানটা কনসল লগ করে দেখতে পেলাম। এরপর বুজতে হবে যে ক্লিক হ্যন্ডলার অর্থ্যাৎ কিছু লিখে সার্চ এ ক্লিক করলে কী লোড করে আমাদের রেজাল্ট দেখাবে। তাই সেই লোড ফাংশনটি এর ভেতর কল করতে হবে। এবং সেই ফাংশনের একটি প্যারামিটার নিতে হবে। 
const clickHandler = () =>{
    loadingSpinner(true)
    const searchField = document.getElementById("input-field")
    const searchText = searchField.value
    searchField.value = ""
    console.log(searchText)
    landPhone(searchText)
}


// landPhone()
// এখানে লোড ফোন কমেন্ট করে দিলাম কারণ উপরে ক্লিক এ সেট করবো বলে। লোড ফোন এ এবার প্যারামিটার সেট করবো ও ইউ আর এল টা হার্ড কোড না করে সার্চ ফিল্ড হিসেবে এইচ টি এম এল সেট করতে হবে। 


const loadingSpinner = (isLoading)=>{
    const loadSpinner = document.getElementById("loading-spinner")
    if(isLoading){
        loadSpinner.classList.remove("hidden")
    }else{
        loadSpinner.classList.add("hidden")
    }
}