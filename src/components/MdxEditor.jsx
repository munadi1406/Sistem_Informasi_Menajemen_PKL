import '@mdxeditor/editor/style.css'
import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'

import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar'
import { InsertTable,tablePlugin,listsPlugin,CreateLink, ListsToggle, BlockTypeSelect} from '@mdxeditor/editor'
import { linkDialogPlugin } from '@mdxeditor/editor'
import { headingsPlugin } from '@mdxeditor/editor'
import {TailwindCSS} from 'tailwindcss'

export default function MdxEditor() {
  return (
    <TailwindCSS disable={true}>
    <MDXEditor markdown='# Samlekom' 
      
      plugins={[headingsPlugin(),tablePlugin(),listsPlugin(),linkDialogPlugin(), toolbarPlugin({
        toolbarContents: () => ( <> <UndoRedo /><BoldItalicUnderlineToggles /><InsertTable /><ListsToggle/><CreateLink/><BlockTypeSelect/></>)
      })]}
    />
    </TailwindCSS>
  )
}