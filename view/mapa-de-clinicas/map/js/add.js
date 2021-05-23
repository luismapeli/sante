const clinicaPForm = document.getElementById('clinica-form');
const clinicaPId = document.getElementById('clinica-id');
const clinicaPAddress = document.getElementById('clinica-address');
const description = document.getElementById('description');

// Send POST to API to add clinica
async function addClinicaP(e) {
  e.preventDefault();

  if (clinicaPId.value === '' || clinicaPAddress.value === '' || description.value === '') {
    alert('Campo vazio');
  }

  const sendBody = {
    clinicaPId: clinicaPId.value,
    address: clinicaPAddress.value,
    description: description.value
  };

  try {
    const res = await fetch('/api/v1/clinicasP', {
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
    window.location.href = '/mapa-de-clinicas/map/localizacao.html';
  } catch (err) {
    alert(err);
    return;
  }
}

clinicaPForm.addEventListener('submit', addClinicaP);