import React from 'react';

type Message = {
    message: string;
};

const Messages: React.FC<Message> = ({ message }) => (
    <tbody style={{ height: '120px' }}>
        <tr>
            <td colSpan={7} style={{ textAlign: 'center' }}>
                {message}
            </td>
        </tr>
    </tbody>
);

export default Messages;
