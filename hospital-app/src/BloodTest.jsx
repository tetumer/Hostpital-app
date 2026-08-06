import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function BloodTest({onAdd, patients, doctors }) {
   const [report, setReport] = useState({
    patientId: "",
    doctorId: "",
    bloodType: "",
    neutrophils: "",
    lymphocytes: "",
    monocytes: "",
    eosinophils: "",
    basophils: "",
    totalCirEosinophils: "",
    rbcCount: "",
    hctOrPCV: "",
    mcv: "",
    mch: "",
    mchc: "",
    rdw_cv: "",
    rdw_sd: "",
    plateletCount: "",
    mpv: "",
    pdw: "",
    pct: "",
    p_lcr: "",
    p_lcc: "",
    date: ""
})

const handleSubmit = () => {
  const resultsString = 
    `Neutrophils: ${report.neutrophils}, Lymphocytes: ${report.lymphocytes}, Monocytes: ${report.monocytes}, ` +
    `Eosinophils: ${report.eosinophils}, Basophils: ${report.basophils}, Total Cir. Eosinophils: ${report.totalCirEosinophils}, ` +
    `RBC Count: ${report.rbcCount}, HCT/PCV: ${report.hctOrPCV}, MCV: ${report.mcv}, MCH: ${report.mch}, MCHC: ${report.mchc}, ` +
    `RDW_CV: ${report.rdw_cv}, RDW_SD: ${report.rdw_sd}, Platelet Count: ${report.plateletCount}, MPV: ${report.mpv}, ` +
    `PDW: ${report.pdw}, PCT: ${report.pct}, P_LCR: ${report.p_lcr}, P_LCC: ${report.p_lcc}`

  onAdd({
    patientId: report.patientId,
    doctorId: report.doctorId,
    bloodType: report.bloodType,
    results: resultsString,
    date: report.date
  })
}
  return (
    <div>
        <h1>Blood test report</h1>
        <div className='ids'>
            <label>Cridential</label>
            <select
                value={report.patientId}
                onChange={(e) =>
                    setReport({
                        ...report,
                        patientId: e.target.value
                    })
                }
            >
            <option value="">Select Patient</option>

                {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                        {patient.name}
                    </option>
            ))}
            </select>
            <select
                value={report.doctorId}
                onChange={(e) =>
                    setReport({
                        ...report,
                        doctorId: e.target.value
                    })
                }
            >
            <option value="">Select Doctor</option>

                {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                    </option>
            ))}
            </select>
        </div>
        <label>BloodType</label>
        <div className='blood'> 
            <select
                value={report.bloodType}
                onChange={(e) =>
                    setReport({
                    ...report,
                    bloodType: e.target.value
                    })
                }
                >
                <option value="">Select Blood Type </option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option> 
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
            </select>
            <div className='wbc'>
                <label>Neutrophils</label>
                <input
                    type="num"
                    value={report.neutrophils}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            neutrophils: e.target.value
                        })
                    }
                />
                <br/>
                <label>Lymphocytes</label>
                <input
                    type="num"
                    value={report.lymphocytes}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            lymphocytes: e.target.value
                        })
                    }
                />
                <br/>
                <label>Monocytes</label>
                <input
                    type="num"
                    value={report.monocytes}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            monocytes: e.target.value
                        })
                    }
                />
                <br/>
                <label>Eosinophils</label>
                <input
                    type="num"
                    value={report.eosinophils}
                    onChange={(e) =>
                    setReport({
                        ...report,
                            eosinophils: e.target.value
                        })
                        }
                />
                    <br/>
                    <label>Basophils</label>
                    <input
                        type="num"
                        value={report.basophils}
                        onChange={(e) =>
                            setReport({
                                ...report,
                                basophils: e.target.value
                            })
                        }
                    />
                    <br/>
                    <label>Total cir.Eosinophils</label>
                    <input
                        type="num"
                        value={report.totalCirEosinophils}
                        onChange={(e) =>
                            setReport({
                                ...report,
                                totalCirEosinophils: e.target.value
                            })
                        }
                    />
            </div>
            <br/>
            <br/>
            <div className='rbc'>
            <label>RBC Count </label>
                <input
                    type="num"
                    value={report.rbcCount}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            rbcCount: e.target.value
                        })
                    }
                />
                <br/>
                <label>HCT Or PCV</label>
                <input
                    type="num"
                    value={report.hctOrPCV}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            hctOrPCV: e.target.value
                        })
                    }
                />
                <br/>
                <label>MCV</label>
                <input
                    type="num"
                    value={report.mcv}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            mcv: e.target.value
                        })
                    }
                />
                <br/>
                <label>MCH</label>
                <input
                    type="num"
                    value={report.mch}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            mch: e.target.value
                        })
                    }
                />
                <br/>
                <label>MCHC</label>
                <input
                    type="num"
                    value={report.mchc}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            mchc: e.target.value
                        })
                    }
                />
                <br/>
                <label>RDW_CV</label>
                <input
                    type="num"
                    value={report.rdw_cv}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            rdw_cv: e.target.value
                        })
                    }
                />
                <br/>
                <label>RDW_SD</label>
                <input
                    type="num"
                    value={report.rdw_sd}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            rdw_sd: e.target.value
                        })
                    }
                />
                <br/>
            </div>
            <div>
                <label>Platelet Count </label>
                <input
                    type="num"
                    value={report.plateletCount}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            plateletCount: e.target.value
                        })
                    }
                />
                <br/>
                <label>MPV</label>
                <input
                    type="num"
                    value={report.mpv}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            mpv: e.target.value
                        })
                    }
                />
                <br/>
                <label>PDW</label>
                <input
                    type="num"
                    value={report.pdw}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            pdw: e.target.value
                        })
                    }
                />
                <br/>
                <label>PCT</label>
                <input
                    type="num"
                    value={report.pct}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            pct: e.target.value
                        })
                    }
                />
                <br/>
                <label>P_LCR</label>
                <input
                    type="num"
                    value={report.p_lcr}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            p_lcr: e.target.value
                        })
                    }
                />
                <br/>
                <label>P_LCC</label>
                <input
                    type="num"
                    value={report.p_lcc}
                    onChange={(e) =>
                        setReport({
                            ...report,
                            p_lcc: e.target.value
                        })
                    }
                />
                
            </div>
        <br/>
        <br/>
        <div>
            <input
                type="date"
                value={report.date}
                onChange={(e) =>
                    setReport({
                        ...report,
                        date: e.target.value
                    })
                }
            />
        </div>
        <br/>
        <button onClick={handleSubmit}>save</button>
        </div>
    </div>
  )
    

}

export default BloodTest