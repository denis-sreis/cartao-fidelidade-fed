import './areaADM.css'
interface AreaADMProps {
  onCadastrarPremioClick: () => void;
  onConsultarClientesClick: () => void;
}

function AreaADM({ onCadastrarPremioClick, onConsultarClientesClick }: AreaADMProps) {
    return(
        <>
        <div className={'secaoADM'}>
            
            {/* A própria DIV agora é o botão.
              - Mova o 'onClick' para a 'div'.
              - Remova o <button> de dentro.
              - Use <br /> para quebrar a linha.
            */}
            <div className={'bCadastrar'} onClick={onCadastrarPremioClick}>
                Cadastrar<br />prêmio
            </div>
            
            {/* Faça o mesmo aqui e atualize o texto 
              para "Meus Clientes" 
            */}
            <div className={'bConsultaCliente'} onClick={onConsultarClientesClick}>
                Meus<br />Clientes
            </div>

        </div>
        </>
    )
}
export default AreaADM