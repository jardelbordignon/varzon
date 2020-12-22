// https://metring.com.br/javascript-substituir-caracteres-especiais

// urlize('Esta é uma frase!!!') -> esta-e-uma-frase

const urlize = str => 
	str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
		.replace(/([^\w]+|\s+)/g, '-') // Substitui espaço e outros caracteres por hífen
		.replace(/(^-+|-+$)/, '') // Remove hífens extras do final ou do inicio da string
    .toLowerCase() // Todas letras minúsculas


export default urlize
