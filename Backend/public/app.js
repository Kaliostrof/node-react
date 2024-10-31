const fullName = document.getElementById("exampleFormControlInput1");
const phone = document.getElementById("exampleFormControlInput2");
const description = document.getElementById("exampleFormControlTextarea1");

document.addEventListener("submit", (event) => {
  event.preventDefault();
  const fio = fullName.value;
  const tel = phone.value;
  const problem = description.value;

  add({ fio, tel, problem }).then(() => {
    fullName.value = "";
    phone.value = "";
    description.value = "";
  });
});

async function add({ fio, tel, problem }) {
  try {
    await fetch(`/`, {
      method: "POST",
      headers: { "Content-type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        fullName: fio,
        phoneNumber: tel,
        problemDescription: problem,
      }),
    });
  } catch (err) {
    console.log("Error", err);
  }
}
