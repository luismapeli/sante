const clinicaForm = document.getElementById('clinica-form');
const clinicaId = document.getElementById('clinica-id');
const clinicaAddress = document.getElementById('clinica-address');
const description = document.getElementById('description');

// Send POST to API to add clinica
async function addClinica(e) {
  e.preventDefault();

  if (clinicaId.value === '' || clinicaAddress.value === '' || description.value === '') {
    alert('Campo vazio');
  }

  const sendBody = {
    clinicaId: clinicaId.value,
    address: clinicaAddress.value,
    description: description.value
  };

  try {
    const res = await fetch('/api/v1/clinicas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
      throw Error('Clinica já cadastrada!');
    }

    alert('Clinica adicionada!');
    window.location.href = '/map/localizacao.html';
  } catch (err) {
    alert(err);
    return;
  }
}

clinicaForm.addEventListener('submit', addClinica);