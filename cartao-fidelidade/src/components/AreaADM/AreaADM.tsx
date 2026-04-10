import './areaADM.css'
interface AreaADMProps {
  onCadastrarPremioClick: () => void;
  onConsultarClientesClick: () => void;
}

function AreaADM({ onCadastrarPremioClick, onConsultarClientesClick }: AreaADMProps) {
    return(
        <>
        <div className={'secaoADM'}>
            <div className={'bCadastrar'} onClick={onCadastrarPremioClick}>
                Cadastrar<br />prêmio
            </div>

            <div className={'bConsultaCliente'} onClick={onConsultarClientesClick}>
               <span>Meus<br />Clientes</span>
            </div>

        </div>
        </>
    )
}
export default AreaADM