/*useMemo-> fica observando o valor de outra variavel e sempre que ela alterar, ele gera um novo valor para uma variavel. 
 utilizado pq sempre que um stato muda a pagina toda é remontada do zero, aí não fica tem como guardar um preview*/
import React, {useState, useMemo} from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function Spot({ history}){
    //criar preview da imagem upada
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    //useMemo-> mesmo esquema do useEffect
    const preview = useMemo(()=>{
        //retorna o conteudo da preview
        /*     if existir algo em thubmnail
                           executar URL(Variavel global do HTML).variavelTemporariaQueAindaNaoFezUpload(parametro)
                                                          esle*/
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },
        [thumbnail]
    )
    

    async function handleSubmit(event){
        //para ele enviar para onde eu quiser qndo clicar em submit
        event.preventDefault();
        //enviar multipartform pelo React
        const data = new FormData();
        //usuario que esta logado, pq preciso saber que criou o spot e no back é passado pelo header
        //              onde foi salvo os dados do usuário
        const user_id = localStorage.getItem('user');
        //adicionar info dentro do meu obj
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);
        
        //chamar api
        //                      post pq quero criar um spot
        await api.post('/spots', data, {
            headers: {user_id}
        })
        
        //mandando de volta a rota /dashboard
        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            {/*gerando preview da imagem selecionada */}
            {/*Se existir thumbnail ou preview(independente da variavel) ?(fazr)adicionar a classe 'has-thumbnail' :(else)adicionar nada  */}
                   {/*className={thumbnail ? 'has-thumbnail' : ''}*/}
            <label id="thumbnail" 
                   style={{ backgroundImage: `url(${preview})`}}
                   className={thumbnail ? 'has-thumbnail' : ''}
            >
                {/*                                                 o valor é zero pq é um vetor e a primeira posição do vetor é zero */}
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img" />
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company"
                placeholder="Sua empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            
            <label htmlFor="techs">TECNOLOGIAS *<span> (separadas por vírgula)</span></label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
            
            <label htmlFor="price">VALOR DA DIÁRIA *<span> (em branco para GRATUITO)</span></label>
            <input
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )             
}


