import { http } from './config'

export default	{

	salvar:(indicacao)=>{
		return http.post('indicacao',indicacao);
  },
    
	atualizar:(indicacao)=>{
		return http.put('indicacao',indicacao);
  },

  	listar:()=>{
		return http.get('indicacoes')
  },
    
	apagar:(indicacao)=>{
		return http.delete('indicacao', { data: indicacao })
	}
}