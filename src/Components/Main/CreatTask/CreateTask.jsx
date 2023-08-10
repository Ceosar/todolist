import React, { useState, useEffect } from 'react'
import "./CreateTask.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import EditorToolbar, { modules, formats } from "./EditorToolBar.jsx";
import { BsTrash3 } from 'react-icons/Bs';
import { GiSettingsKnobs } from 'react-icons/gi'
import Select from 'react-select';

export default function CreateTask() {


    const [task, settask] = useState({});
    const [activTask, setActivTask] = useState(-1);
    const [nameTask, setnameTask] = useState('');
    const [textDisc, setTextDisc] = useState('');
    const [selektEtaps, setSelektEtaps] = useState([]);
    const [otv, setOtv] = useState([]);

    const saveTask = () => {
        if (activTask != -1) {
            saveActivTaske(activTask);
        }
    }


    const sellectActivTaske = (id) => {

        if (activTask !== -1) {
            saveActivTaske(activTask, false);
        }

        setActivTask(id);

        setnameTask(task[id].name);
        setTextDisc(task[id].disk);

        let newEtaps = []

        task[id].etaps.map((value) => {
            newEtaps.push(value);
        })
        if (newEtaps.length == 0) {
            newEtaps = [{ "name": "", "status": false }]
        }

        setOtv(task[id].otv)

        setSelektEtaps(newEtaps)

    };

    const saveActivTaske = (id, flag = true) => {
        if (flag) {
            setActivTask(-1)
        }
        let newtask = { ...task };

        newtask[id].name = nameTask;

        newtask[id].disk = textDisc;

        let newEtaps = []

        for (let value in selektEtaps) {
            newEtaps.push(selektEtaps[value])
        }

        newtask[id].etaps = newEtaps

        newtask[id].otv = otv

        settask(newtask);

    };


    const addTask = () => {
        let newtask = { ...task };
        newtask[Object.keys(newtask).length] = {
            "name": "Новая задача",
            "disk": "",
            "etaps": [],
            "otv": [],
        }
        settask(newtask);
    };

    const addEtaps = () => {

        let newEtaps = [...selektEtaps];
        // { "name": "Пушить все в ветку dev", "status": false }
        newEtaps.push({ "name": "", "status": false })

        setSelektEtaps(newEtaps)

    };


    const dellTaske = (id) => {
        let newtask = {};
        setActivTask(-1);
        for (let key in task) {
            if (task.hasOwnProperty(key)) {
                const index = Object.keys(task).indexOf(key);
                if (index !== id) {
                    newtask[Object.keys(newtask).length] = task[key];
                }
            }
        }
        settask(newtask);
    };

    const dellEtaps = (id) => {
        let newselektEtaps = [];
        for (let key in selektEtaps) {
            if (selektEtaps.hasOwnProperty(key)) {
                const index = Object.keys(selektEtaps).indexOf(key);
                if (index !== id) {
                    newselektEtaps[Object.keys(newselektEtaps).length] = selektEtaps[key];
                }
            }
        }
        setSelektEtaps(newselektEtaps);
    };

    const handleDragStart = (event, index) => {
        event.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, newIndex) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const draggedIndex = parseInt(data);
        if (draggedIndex !== newIndex) {
            const newtask = Object.values(task).map((item, index) => {
                if (index === draggedIndex) return task[newIndex];
                if (index === newIndex) return task[draggedIndex];
                return item;
            });
            settask(Object.fromEntries(newtask.map((item, index) => [index, item])));
        }
    };

    const changeSelektEtap = (id, parm) => {
        let oldEtap = [...selektEtaps]
        oldEtap[id].name = parm
        setSelektEtaps(oldEtap)
    }


    const options = [
        { value: 1, label: 'Илья' },
        { value: 2, label: 'Данил' },
        { value: 3, label: 'Алексей' },
    ];

    const selectOtv = (selectedOptions) => {
        setOtv(selectedOptions);
    };

    return (
        <>
            <div className='add-contaner'>
                {Object.keys(task).map((id, index) => (

                    <div
                        className={'task ' + (activTask == index ? "active" : "")}
                        key={index}
                        draggable={activTask == index ? "false" : "true"}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleDrop(e, index)}
                    >
                        {activTask == index && (
                            <>
                                <input className='NameZad' type="text" value={nameTask} onChange={(e) => setnameTask(e.target.value)} placeholder="Название фазы" ></input>
                                <p>Описание задачи</p>
                                <div className="textdisc">
                                    <EditorToolbar />
                                    <ReactQuill value={textDisc}
                                        onChange={(value) => setTextDisc(value)}
                                        theme="snow"
                                        placeholder={"Опишите задачу"}
                                        modules={modules}
                                        formats={formats}
                                    />
                                </div>
                                <p>Этапы</p>
                                <div className="addEtaps">
                                    {selektEtaps.map((component, index) => (
                                        <div className="Etap" key={index}>
                                            <div className="comp">
                                                <BsTrash3 className='DellEtap' onClick={() => dellEtaps(index)} />
                                                <input className='inputEtzps' type="text" value={selektEtaps[index].name} onChange={(e) => changeSelektEtap(index, e.target.value)} placeholder="Этап задачи" ></input>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <AiOutlinePlusCircle className='AddComp' onClick={addEtaps} />
                                <p>Исполнители</p>
                                <Select
                                    isMulti
                                    options={options}
                                    onChange={selectOtv}
                                    className='SelectOtv'
                                    placeholder="Выберите ответсвенных"
                                    value={otv}
                                />

                                {/* 
                                <p>Остальные параметры</p>
                                <div className="otherParms">
                                    {Object.keys(otherParms).map((component, index) => (
                                        <div className="otherParm" key={index}>
                                            <div className="parm">
                                                <BsTrash3 className='DellParm' onClick={() => dellParm(index)} />
                                                <input className='ves' type="text" value={otherParms[index]} onChange={(e) => selektParm(index, e.target.value)} placeholder="Параметр" ></input>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <AiOutlinePlusCircle className='AddComp' onClick={addParm} />
                                */}
                                <div className="butns">
                                    <button className='save-btn' onClick={() => saveActivTaske(index)}>Сохранить</button>
                                    <button className='del-btn  ' onClick={() => dellTaske(index)}>Удалить</button>
                                </div>

                            </>
                        )}
                        {activTask != index && (
                            <>
                                <div className="stats">
                                    <div className="name" >{task[id].name}</div>
                                    {/* <div className="colvoZad">Всего шагов - {task[id].etaps.length}</div> */}
                                </div>
                                <GiSettingsKnobs className='SettingsTask' onClick={() => sellectActivTaske(id)} />
                            </>
                        )}
                    </div>
                ))}
                <AiOutlinePlusCircle className='AddTask' onClick={addTask} />
            </div >
            {Object.keys(task).length > 0 && (<button className="saveTask" onClick={saveTask}>Сохранить</button>)}

        </>
    )
}
