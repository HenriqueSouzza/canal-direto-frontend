/**
  *<b>FORM_RULES</b> Constante do tipo objeto responsável por conter os validações do to ternário com ou sem regex e contendo 
  * a mensagem de erro em caso de "falha"
  */
 export const FORM_RULES = {
    required: value => value ? undefined : 'Esse campo é obrigatório',
    max: max => value => value && value.length > max ? `Esse campo deve possuir no máximo ${max} caracteres` : undefined,
    min: min => value => value && value.length < min ? `Esse campo deve possuir no minimo ${min} caracteres` : undefined,
    number: value => value && isNaN(Number(value)) ? 'Este campo só aceita números' : undefined,
    minValue: min => value => value && parseFloat(value) < parseFloat(min) ? `O valor deve ser maior que ${parseFloat(min)}` : undefined,
    maxValue: max => value => value && parseFloat(value) > parseFloat(max) ? `O valor deve ser menor que ${parseFloat(max)}` : undefined,
    maxValueExact: max => value => value && parseFloat(value) != parseFloat(max) ? `O valor do desconto deve ser igual a ${parseFloat(max)}` : undefined,
    password: value => (value && !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]){8,20})/i.test(value) ? 'Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número e tamanho entre 8 - 20.' : undefined),
    email: value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Email inválido' : undefined,
    tooOld: value => value => value && value > 65 ? 'You might be too old for this' : undefined,
    alphaNumeric: value => value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Somente caracteres alfanuméricos' : undefined
}