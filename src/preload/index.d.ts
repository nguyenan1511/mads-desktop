import { CreateNote, DeleteNote, GetNotes, OpenExternal, ReadNote, WriteNote } from '@shared/types';

declare global {
    interface Window {
        // electron: ElectronAPI
        context: {
            locale: string;
            getNotes: GetNotes;
            readNote: ReadNote;
            writeNote: WriteNote;
            createNote: CreateNote;
            deleteNote: DeleteNote;
            openExternal: OpenExternal;
            updateMessage: any;
        };
    }
}
