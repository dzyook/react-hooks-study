import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { playerContext } from '../../App.js';

function Home(props: any) {
    const [name, setName] = useState('');
    const [hasFill, setFill] = useState(false);
    const history = useHistory();
    let newPlayer = useContext(playerContext);

    useEffect(() => {
        props.socket.emit("isFill")
        props.socket.on('hasFill', (data: boolean) => {
            console.log(data, hasFill)
            setFill(data)
        })
    }, [])

    function handleChange(e: any) {
        setName(e.target.value)
    }

    function handleKeydown(e: any) {
        if (e.keyCode === 13) {
            console.log(hasFill)
            if(!hasFill) {
                newPlayer.name1 = name;
                props.socket.emit("login", name)
                history.push("/game")
            }
            else alert("满人了！")
        }
    }

    return (
        <Box>
            <div className="content">
                <span>请输入昵称</span> 
                <input value={name} onKeyDown={handleKeydown}  onChange={handleChange} />
            </div>
        </Box>
    )
}

const Box = styled.div`
    background: black;
    position: absolute;
    width: 100%;
    height: 100%;  
    .content {
        height: 120px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        span {
            color: #fff;
            font-size: 22px;
        }
        input {
            height: 40px;
            background: #fff;
            border: 0;
            border-bottom: 1px solid #fff;
            padding: 0;
            font-size: 22px;
            color: black;
            &:hover {
                border: 0;
            }
        }
    }
`

export default Home;