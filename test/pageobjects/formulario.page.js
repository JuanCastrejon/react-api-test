class FormularioPage {
    get inputTitle() { return $('#inputTitle'); }
    get inputCreator() { return $('#inputCreator'); }
    get inputRating() { return $('#inputRating'); }
    get inputDates() { return $('#inputDates'); }
    get inputImage() { return $('#inputImage'); }
    get inputChannel() { return $('#inputChannel'); }
    get submitButton() { return $('input[type="submit"]'); }
    get successMessage() { return $('.alert-success'); }

    async fillForm(data) {
        await this.inputTitle.setValue(data.title);
        await this.inputCreator.setValue(data.creator);
        await this.inputRating.setValue(data.rating);
        await this.inputDates.setValue(data.dates);
        await this.inputImage.setValue(data.image);
        await this.inputChannel.setValue(data.channel);
    }

    async submitForm() {
        await this.submitButton.click();
    }
}

module.exports = new FormularioPage();