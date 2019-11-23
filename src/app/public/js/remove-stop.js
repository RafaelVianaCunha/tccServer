let tabelaStops = document.querySelector('#stop');
tabelaStops.addEventListener('click', (evento) => {
    let elementoClicado = evento.target;

    if (elementoClicado.dataset.type == 'remocao') {
        let stopId = elementoClicado.dataset.ref;
        fetch(`http://localhost:3000/stop/${stopId}`, { method: 'DELETE' })
            .then(resposta => {

                let tr = elementoClicado.closest(`#stop_${stopId}`);
                tr.remove();
            })
            .catch(erro => console.log(erro));
    }
});