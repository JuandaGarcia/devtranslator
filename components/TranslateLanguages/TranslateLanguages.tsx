'use client'
import Editor, { EditorProps, Monaco } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import dracula from 'themes/dracula.json'
import s from './TranslateLanguages.module.scss'
import { useRef, useState } from 'react'
import NormalButton from 'components/GlowingButton/Normal'
import { MdArrowForwardIos } from 'react-icons/md'
import { useCompletion } from 'ai/react'

const TranslateLanguages = () => {
	const [languages, setLanguages] = useState<{ id: string; name: string }[]>([])
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
	const { completion, complete, error, isLoading } = useCompletion({
		api: '/api/completion',
	})
	const editorProps: EditorProps = {
		width: '100%',
		height: 350,
		theme: 'vs-dark',
		className: s.translate_languages__editor,
		options: {
			minimap: { enabled: false },
		},
	}

	const handleEditorDidMount = (
		editor: editor.IStandaloneCodeEditor,
		monaco: Monaco,
		isInput?: boolean
	) => {
		monaco.editor.defineTheme('Dracula', dracula as editor.IStandaloneThemeData)
		monaco.editor.setTheme('Dracula')
		if (isInput) {
			const monacoLanguages = monaco.languages.getLanguages()
			const languages = monacoLanguages.map(language => ({
				id: language.id,
				name: language.aliases ? language.aliases[0] : language.id,
			}))
			setLanguages(languages)
			editorRef.current = editor
		}
	}

	const handleTranslate = () => {
		const editor = editorRef.current
		if (editor) {
			const value = editor.getValue()
			complete(`Traduce el siguiente código a sql ${value}`)
		}
	}

	return (
		<main className={s.translate_languages}>
			<div className={s.translate_languages__selectors}>
				{/* <select>
					{languages.map(language => (
						<option key={language.id} value={language.id}>
							{language.name}
						</option>
					))}
				</select> */}
			</div>
			<Editor
				{...editorProps}
				defaultLanguage="javascript"
				onMount={(editor, monaco) => handleEditorDidMount(editor, monaco, true)}
			/>
			<Editor
				{...editorProps}
				defaultLanguage="java"
				onMount={handleEditorDidMount}
				value={completion}
				options={{ ...editorProps.options, readOnly: true }}
			/>
			<div className={s.translate_languages__button}>
				<NormalButton onClick={handleTranslate} disabled={isLoading}>
					<span className={s.translate_languages__button__text}>
						Traducir <MdArrowForwardIos />
					</span>
				</NormalButton>
			</div>
		</main>
	)
}

export default TranslateLanguages
