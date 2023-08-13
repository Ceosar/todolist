import React, { useState } from 'react'
import { AiOutlineClockCircle, AiOutlineCloseCircle, AiOutlineCheckCircle, AiOutlineExclamationCircle } from 'react-icons/ai'
import dataJson from './data.json'
import './Zad.scss'

export default function Zad() {
    const [filledStar, setFilledStar] =useState();
    const handlerStarred = () => {

    }

    return (
        <div className='tasks_wrapper'>
            {dataJson.map((value, index) => (
                <div className="resept" key={index}>
                    {value.status == "ok" && (
                        <div className='block_ok'>
                            <div className="up_ok_block">
                                <div className="left_up_ok">
                                    <div className='num_of_block'>
                                        0{index + 1}
                                    </div>
                                    <div className='name_of_block'>
                                        {value.name}
                                    </div>
                                </div>
                                <div className="right_up_ok_block"></div>
                                {/* <h1>Выполнен</h1> */}
                            </div>
                            <div className="down_of_block">
                                <div className="status">Статус: <div style={{ color: "#80FFBA" }}>{value.status == "ok" ? "Выполнен" : value.status == "work" ? "В работе" : value.status == "delay" ? "Просрочен" : "Не принят в работу"}</div></div>
                                <div className='information_block'>
                                    <div className='time_create'>08.08.2023</div>
                                    <div className='border'></div>
                                    <button className='star'>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#2B2B2B" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        // <AiOutlineCheckCircle className={"icon " + value.status} />
                    )}
                    {value.status == "work" && (
                        <div className='block_work'>
                            <div className="up_work_block">
                                <div className="left_up_ok">
                                    <div className='num_of_block'>
                                        0{index + 1}
                                    </div>
                                    <div className='name_of_block'>
                                        {value.name}
                                    </div>
                                </div>
                                <div className="right_up_work_block"></div>
                                {/* <h1>Выполнен</h1> */}
                            </div>
                            <div className="down_of_block">
                                <div className="status">Статус: <div style={{ color: "#2BBFFF" }}>{value.status == "ok" ? "Выполнен" : value.status == "work" ? "В работе" : value.status == "delay" ? "Просрочен" : "Не принят в работу"}</div></div>
                                <div className='information_block'>
                                    <div className='time_create'>08.08.2023</div>
                                    <div className='border'></div>
                                    <button className='star'>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#2B2B2B" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>                                </div>
                            </div>
                        </div>
                        // <AiOutlineExclamationCircle className={"icon " + value.status} />
                    )
                    }
                    {
                        value.status == "nowork" && (
                            <div className='block_nowork'>
                                <div className="up_nowork_block">
                                    <div className="left_up_nowork">
                                        <div className='num_of_block'>
                                            0{index + 1}
                                        </div>
                                        <div className='name_of_block'>
                                            {value.name}
                                        </div>
                                    </div>
                                    <div className="right_up_nowork_block"></div>
                                    {/* <h1>Выполнен</h1> */}
                                </div>
                                <div className="down_of_block">
                                    <div className="status">Статус: <div style={{ color: "#6046FF" }}>{value.status == "ok" ? "Выполнен" : value.status == "work" ? "В работе" : value.status == "delay" ? "Просрочен" : "Не принят в работу"}</div></div>
                                    <div className='information_block'>
                                        <div className='time_create'>08.08.2023</div>
                                        <div className='border'></div>
                                        <button className='star'>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#2B2B2B" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            // <AiOutlineClockCircle className={"icon " + value.status} />
                        )
                    }
                    {
                        value.status == "delay" && (
                            <h1>Просрочен</h1>
                            // <AiOutlineClockCircle className={"icon " + value.status} />
                        )
                    }
                    {/* <div className="text">
                        <div className="title">{value.title}</div>
                        <div className="status">Статус - {value.status == "ok" ? "Выполнен" : value.status == "work" ? "В работе" : value.status == "delay" ? "Просрочен" : "Не принят в работу"}</div>
                    </div> */}
                </div >
            ))
            }
        </div >
    )
}
