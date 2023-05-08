import { useState, useEffect } from 'react'

import css from './calculator.module.css'

const BMITable = ({ bmi }) => {
    let veryUnderweightCSS = ""
    let underweightCSS = ""
    let idealWeightCSS = ""
    let overweightCSS = ""
    let obese1CSS = ""
    let obese2CSS = ""
    let obese3CSS = ""

    if (bmi === null) {
        // Fazer nada
    } else if (bmi < 17) {
        veryUnderweightCSS = "table-danger fw-bold"
    } else if (bmi < 18.5) {
        underweightCSS = "table-warning fw-bold"
    } else if (bmi < 25) {
        idealWeightCSS = "table-success fw-bold"
    } else if (bmi < 30) {
        overweightCSS = "table-warning fw-bold"
    } else if (bmi < 35) {
        obese1CSS = "table-danger fw-bold"
    } else if (bmi < 40) {
        obese2CSS = "table-danger fw-bold"
    } else {
        obese3CSS = "table-danger fw-bold"
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>IMC</th>
                    <th>Descrição</th>
                </tr>
            </thead>
            <tbody>
                <tr className={veryUnderweightCSS}>
                    <th>&lt; 17</th>
                    <td>Muito abaixo do peso</td>
                </tr>
                <tr className={underweightCSS}>
                    <th>17,0 a 18,5</th>
                    <td>Abaixo do peso</td>
                </tr>
                <tr className={idealWeightCSS}>
                    <th>18,5 a 25,0</th>
                    <td>Peso ideal</td>
                </tr>
                <tr className={overweightCSS}>
                    <th>25,0 a 30,0</th>
                    <td>Acima do peso</td>
                </tr>
                <tr className={obese1CSS}>
                    <th>30,0 a 35,0</th>
                    <td>Obesidade classe 1</td>
                </tr>
                <tr className={obese2CSS}>
                    <th>35,0 a 40</th>
                    <td>Obesidade classe 2 (severa)</td>
                </tr>
                <tr className={obese3CSS}>
                    <th>&gt; 40</th>
                    <td>Obesidade classe 3 (mórbida)</td>
                </tr>
            </tbody>
        </table>
    )
}

const Calculator = () => {
    const [altura, setAltura] = useState("")
    const [peso, setPeso] = useState("")
    const [imc, setIMC] = useState(null)

    useEffect(() => {
        if (altura.trim() === "" || peso.trim() === "") {
            setIMC(null)
            return
        }

        const alturaNumero = Number(altura)
        const pesoNumero = Number(peso)

        if (alturaNumero == 0 || pesoNumero == 0) {
            setIMC(null)
            return
        }

        const imcCalculado = pesoNumero / (alturaNumero*alturaNumero)
        setIMC(imcCalculado)
    }, [altura, peso])

    const renderizaTopo = () => {
        if (imc === null) {
            return (<>Informe os dados</>)
        }
        
        return (<>Seu IMC é {imc.toFixed(2)}</>)
        
    }
    return (
        <div className="row gx-5">
            <div className={`col-md-4 ${css.divForm}`}>
                <p className={"display-5 text-center"}>
                    {renderizaTopo()}
                </p>
                <form>
                    <div className="row mb-3">
                        <label htmlFor="altura" className="col-sm-2 col-form-label">Altura</label>
                        <div className="col-sm-10">
                            <div className="input-group">
                                <input type="number" min="1" step="0.01" className={`form-control ${css.BMIcalculatorInput}`} id="altura"
                                    placeholder="Altura (m)" onChange={(e) => setAltura(e.target.value)} />
                                <span className={`input-group-text ${css.customInputGroupText}`}>m</span>
                            </div>

                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="peso" className="col-sm-2 col-form-label">Peso</label>
                        <div className="col-sm-10">
                            <div className="input-group">
                                <input type="number" min="1" step="0.01" className={`form-control ${css.BMIcalculatorInput}`} id="peso"
                                    placeholder="Peso (kg)" onChange={(e) => setPeso(e.target.value)} />
                                <span className={`input-group-text ${css.customInputGroupText}`}>kg</span>
                            </div>
                        </div>
                    </div>
                </form>
                <p className="text-center">
                    Consulte na
                    tabela ao lado em que categoria você se enquadra
                </p>
            </div>
            <div className="col-md-8 mt-4 mt-md-0">
                <BMITable bmi={imc} />
            </div>
        </div>
    )
}

export default Calculator