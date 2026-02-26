const mongoose = require('mongoose');
/** aqui estruturamos os dados e seus tipos **/
const PessoaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  dataCadastro: { type: Date, default: Date.now }
});
/** cria o model e uma coleção no mongodb chamada pessoas **/
module.exports = mongoose.model('Pessoas', PessoaSchema);