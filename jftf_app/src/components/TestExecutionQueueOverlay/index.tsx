import React, {useEffect, useState} from 'react';
import {styled} from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import {Theme} from '@mui/material/styles';
import {KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material';

const Overlay = styled('div')(({theme}) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '16px',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    zIndex: 9999,
    transition: 'transform 0.3s ease',
    transform: 'translateY(0)',
    '&.hidden': {
        transform: 'translateY(100%)',
    },
}));

const TaskBox = styled('div')(({theme}) => ({
    display: 'inline-block',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
}));

const ToggleButton = styled(Fab)(({theme}) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    zIndex: 10000,
}));

export let taskQueue: string[] = [];
export let setTaskQueue: React.Dispatch<React.SetStateAction<string[]>> = () => {
};

export const enqueueTask = (taskId: string) => {
    setTaskQueue((prevQueue) => [...prevQueue, taskId]);
};

export const dequeueTask = (taskId: string) => {
    setTaskQueue((prevQueue) => prevQueue.filter((id) => id !== taskId));
};

interface TaskQueueOverlayProps {
    theme: Theme;
}

const TaskQueueOverlay: React.FC<TaskQueueOverlayProps> = ({theme}) => {
    const [localTaskQueue, setLocalTaskQueue] = useState<string[]>([]);
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);

    useEffect(() => {
        taskQueue = localTaskQueue;
        setTaskQueue = setLocalTaskQueue;
    }, [localTaskQueue]);

    useEffect(() => {
        const checkTaskStatus = async () => {
            for (const taskId of localTaskQueue) {
                console.log(taskId);
            }
        };

        const intervalId = setInterval(checkTaskStatus, 5000); // Polling interval of 5 seconds

        return () => {
            clearInterval(intervalId);
        };
    }, [localTaskQueue]);

    const handleToggleOverlay = () => {
        setIsOverlayVisible((prevState) => !prevState);
    };

    if (localTaskQueue.length === 0) {
        return null; // Don't render the overlay if the queue is empty
    }

    return (
        <>
            <Overlay
                theme={theme}
                className={isOverlayVisible ? '' : 'hidden'}
            >
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {localTaskQueue.map((taskId) => (
                        <TaskBox
                            key={taskId}
                            sx={{
                                backgroundColor: theme.palette.grey[900],
                            }}
                        >
                            {taskId}
                        </TaskBox>
                    ))}
                    {localTaskQueue.length > 0 && <CircularProgress size={24}/>}
                </div>
            </Overlay>
            <ToggleButton
                onClick={handleToggleOverlay}
                sx={{
                    display: localTaskQueue.length > 0 ? 'block' : 'none',
                    zIndex: 10001,
                }}
            >
                {isOverlayVisible ? <KeyboardArrowDown/> : <KeyboardArrowUp/>}
            </ToggleButton>
        </>
    );
};

export default TaskQueueOverlay;
