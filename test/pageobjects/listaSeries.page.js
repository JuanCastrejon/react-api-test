class ListaSeriesPage {
    get seriesItems() { return $$('.serie'); }
    get deleteButtons() { return $$('button=Eliminar'); }
    get editButtons() { return $$('button=Editar'); }
    get viewDetailsButtons() { return $$('button=Ver detalles'); }
    get errorMessage() { return $('.error-message'); }
    get serieDetails() { return $('.serie-details'); }

    async open() {
        await browser.url('/lista-series'); // Cambia esto a la URL correcta
    }

    async deleteSerie(index) {
        await this.deleteButtons[index].click();
    }

    async editSerie(index) {
        await this.editButtons[index].click();
    }

    async viewDetails(index) {
        await this.viewDetailsButtons[index].click();
    }
}

module.exports = new ListaSeriesPage();