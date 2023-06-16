import React, {useEffect, useState} from 'react';
import {styled} from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import {Theme} from '@mui/material/styles';
import {KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material';
import {
    getTestApplicationExecutionTaskStatus
} from "../../utils/api/get-test-application-execution-task-status-async.tsx";
import {toast} from "react-toastify";

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

export interface Task {
    id: string;
    name: string;
}

export let taskQueue: Task[] = [];
export let setTaskQueue: React.Dispatch<React.SetStateAction<Task[]>> = () => {
};

export const enqueueTask = (taskId: string, taskName: string) => {
    setTaskQueue((prevQueue) => [...prevQueue, {id: taskId, name: taskName}]);
};

export const dequeueTask = (taskId: string) => {
    setTaskQueue((prevQueue) => prevQueue.filter((task) => task.id !== taskId));
};

interface TaskQueueOverlayProps {
    theme: Theme;
}

const TaskQueueOverlay: React.FC<TaskQueueOverlayProps> = ({theme}) => {
    const [localTaskQueue, setLocalTaskQueue] = useState<Task[]>([]);
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);

    useEffect(() => {
        taskQueue = localTaskQueue;
        setTaskQueue = setLocalTaskQueue;
    }, [localTaskQueue]);

    useEffect(() => {
        const checkTaskStatus = async () => {
            for (const task of localTaskQueue) {
                const taskStatus = await getTestApplicationExecutionTaskStatus(task.id);

                if (taskStatus === 'SUCCESS') {
                    dequeueTask(task.id);
                    toast.success(`Test application execution task '${task.name}' (${task.id}) completed successfully.`);
                } else if (taskStatus === 'FAILURE') {
                    dequeueTask(task.id);
                    toast.error(`Test application execution task '${task.name}' (${task.id}) failed.`);
                }
            }
        };

        const intervalId = setInterval(checkTaskStatus, 1000); // Polling interval of 1 second

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
                    {localTaskQueue.map((task) => (
                        <TaskBox
                            key={task.id}
                            sx={{
                                backgroundColor: theme.palette.grey[900],
                            }}
                        >
                            {task.name} ({task.id})
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
