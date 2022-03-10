import { List, Paper } from '@mui/material';
import { DragEvent, FC, useContext, useMemo } from 'react';
import { EntryContext, UIContext } from '../../contexts';
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './EntryCard';
import style from './EntryList.module.css';

type EntryListProps = {
  status: EntryStatus;
};

export const EntryList: FC<EntryListProps> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntryContext);
  const { isDragging, setIsDragging } = useContext(UIContext);

  const filteredEntries = useMemo(() => entries.filter((entry) => entry.status === status), [entries, status]);

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const entryId = e.dataTransfer.getData('entryId');
    const entry = entries.find((entry) => entry._id === entryId);
    if (entry) {
      updateEntry({ ...entry, status: status });
    }
    setIsDragging(false);
  };

  return (
    <div onDrop={onDropEntry} onDragOver={(e) => e.preventDefault()} className={isDragging ? style.dragging : ''}>
      <Paper sx={{ height: 'calc(100vh - 180px)', backgroundColor: 'transparent', padding: '1px 5px', overflow: 'auto' }}>
        <List sx={{ opacity: isDragging ? 0.6 : 1 }}>
          {filteredEntries.map((entry) => (
            <EntryCard entry={entry} key={entry._id} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
