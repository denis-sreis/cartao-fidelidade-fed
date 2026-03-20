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
                Meus<br />Clientes
            </div>

        </div>
        </>
    )
}
export default AreaADM