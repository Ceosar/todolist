import React from 'react'
import { AiOutlineClockCircle, AiOutlineCloseCircle, AiOutlineCheckCircle, AiOutlineExclamationCircle } from 'react-icons/ai'
import dataJson from './data.json'
import './Zad.scss'

export default function Zad() {
    return (
        <>
            {dataJson.map((value, index) => (
                <div className="resept" key={index}>
                    {value.status == "ok" && (
                        <AiOutlineCheckCircle className={"icon " + value.status} />
                    )}
                    {value.status == "error" && (
                        <AiOutlineCloseCircle className={"icon " + value.status} />
                    )}
                    {value.status == "work" && (
                        <AiOutlineExclamationCircle className={"icon " + value.status} />
                    )}
                    {value.status == "nowork" && (
                        <AiOutlineClockCircle className={"icon " + value.status} />
                    )}
                    <div className="text">
                        <div className="title">{value.title}</div>
                        <div className="status">Статус - {value.status == "ok" ? "Завершон" : value.status == "error" ? "Допущена ошибка " : value.status == "work" ? "В работе" : "Не принят в работу"}</div>
                    </div>
                </div>
            ))}
        </>
    )
}
