export const to_br_real = (value: number | string) => {
    if(typeof value !== 'number') {
        try{
            value = parseFloat(value);
        }catch{
            value = 0;
        }
    }
    var result = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    result = result.replace(".", ",");
    result = result.replace("R$", "R$ ");
    return result;
};
