'use client'
import Editor, { Monaco } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import Dracula from 'themes/Dracula.json'
import s from './TranslateLanguages.module.scss'

const TranslateLanguages = () => {
	const handleEditorDidMount = (
		editor: editor.IStandaloneCodeEditor,
		monaco: Monaco
	) => {
		monaco.editor.defineTheme('Dracula', Dracula as editor.IStandaloneThemeData)
		monaco.editor.setTheme('Dracula')
	}

	return (
		<main className={s.translate_languages}>
			<Editor
				width="100%"
				height={400}
				defaultLanguage="javascript"
				defaultValue={''}
				theme="vs-dark"
				onMount={handleEditorDidMount}
				className={s.translate_languages__editor}
				options={{ minimap: { enabled: false } }}
			/>
			<Editor
				width="100%"
				height={400}
				defaultLanguage="javascript"
				defaultValue={''}
				theme="vs-dark"
				onMount={handleEditorDidMount}
				className={s.translate_languages__editor}
				options={{ minimap: { enabled: false }, readOnly: true }}
			/>
		</main>
	)
}

export default TranslateLanguages
