/**
 * Song text parser
 *
 * @author Shushik <silkleopard@yandex.ru>
 * @version 1.0
 * @license MIT
 */

export type TuneItems = (
  'Ab' | 'Bb' | 'Cb' | 'Db' | 'Eb' | 'Fb' | 'Gb' |
  'A♭' | 'B♭' | 'C♭' | 'D♭' | 'E♭' | 'F♭' | 'G♭' |
  'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' |
  'A#' | 'B#' | 'C#' | 'D#' | 'E#' | 'F#' | 'G#' |
  'A♯' | 'B♯' | 'C♯' | 'D♯' | 'E♯' | 'F♯' | 'G♯'
)[]

/**
 * @const {string} FLAT_SYMBOL
 */
export const FLAT_SYMBOL = '♭'

/**
 * @const {RegExp} FLAT_REXP
 */
export const FLAT_REXP = /([ABCDEFG])b/g

/**
 * @const {string} BEKAR_SYMBOL
 */
export const BEKAR_SYMBOL = '♮'

/**
 * @const {string} SHARP_SYMBOL
 */
export const SHARP_SYMBOL = '♯'

/**
 * @const {RegExp} SHARP_REXP
 */
export const SHARP_REXP = /([ABCDEFG])#/g

/**
 * @const {string} TITLE_DEFAULT
 */
const TITLE_DEFAULT = '* * *'

/**
 * @const {string} TITLE_ALIAS
 */
export const TITLE_ALIAS = 'title'

/**
 * @const {string} ASTERISM_DEFAULT
 */
const ASTERISM_DEFAULT = TITLE_DEFAULT

/**
 * @const {string} AUTHOR_TYPE_MUSIC
 */
export const AUTHOR_TYPE_MUSIC = 'composed'

/**
 * @const {string} AUTHOR_TYPE_LYRICS
 */
export const AUTHOR_TYPE_LYRICS = 'written'

/**
 * @const {string} AUTHOR_TYPE_ARTIST
 */
export const AUTHOR_TYPE_ARTIST = 'performed'

/**
 * @const {string} AUTHOR_TYPE_DEFAULT
 */
export const AUTHOR_TYPE_DEFAULT = 'author'

/**
 * @const {string} AUTHOR_TYPE_TRANSLATION
 */
export const AUTHOR_TYPE_TRANSLATION = 'translated'

/**
 * @const {Array} AUTHOR_TYPES
 */
const AUTHOR_TYPES: string[] = [
  AUTHOR_TYPE_MUSIC,
  AUTHOR_TYPE_ARTIST,
  AUTHOR_TYPE_LYRICS,
  AUTHOR_TYPE_DEFAULT,
  AUTHOR_TYPE_TRANSLATION
]

/**
 * @const {Object} AUTHOR_ORDER
 */
const AUTHOR_ORDER: { [index: string]: number } = {
  [AUTHOR_TYPE_MUSIC]: 1,
  [AUTHOR_TYPE_ARTIST]: 4,
  [AUTHOR_TYPE_LYRICS]: 2,
  [AUTHOR_TYPE_DEFAULT]: 0,
  [AUTHOR_TYPE_TRANSLATION]: 3
}

/**
 * @const {string} VERSE_TYPE_CODA
 */
export const VERSE_TYPE_CODA = 'coda'

/**
 * @const {string} VERSE_TYPE_NOTE
 */
export const VERSE_TYPE_NOTE = 'note'

/**
 * @const {string} VERSE_TYPE_INTRO
 */
export const VERSE_TYPE_INTRO = 'intro'

/**
 * @const {string} VERSE_TYPE_BRIDGE
 */
export const VERSE_TYPE_BRIDGE = 'bridge'

/**
 * @const {string} VERSE_TYPE_CHORUS
 */
export const VERSE_TYPE_CHORUS = 'chorus'

/**
 * @const {string} VERSE_TYPE_DEFAULT
 */
export const VERSE_TYPE_DEFAULT = 'verse'

/**
 * @const {string} VERSE_TYPE_ASTERISM
 */
export const VERSE_TYPE_ASTERISM = 'asterism'

/**
 * @const {string} VERSE_TYPE_EPIGRAPH
 */
export const VERSE_TYPE_EPIGRAPH = 'epigraph'

/**
 * @const {Array} VERSE_TYPES
 */
const VERSE_TYPES: string[] = [
  VERSE_TYPE_CODA,
  VERSE_TYPE_NOTE,
  VERSE_TYPE_CHORUS,
  VERSE_TYPE_INTRO,
  VERSE_TYPE_BRIDGE,
  VERSE_TYPE_DEFAULT,
  VERSE_TYPE_ASTERISM,
  VERSE_TYPE_EPIGRAPH
]

/**
 * @const {number} REPEAT_TIMES
 */
const REPEAT_TIMES = 2

/**
 * @const {string} REPEAT_ALIAS
 */
export const REPEAT_ALIAS = 'repeat'

/**
 * @const {string} REPEAT_SHORTCUT
 */
export const REPEAT_SHORTCUT = 'r'

/**
 * @const {string} CHORD_ALIAS
 */
export const CHORD_ALIAS = 'chord'

/**
 * @const {string} CHORD_SHORTCUT
 */
export const CHORD_SHORTCUT = 'c'

/**
 * @const {number} SPACER_TIMES
 */
const SPACER_TIMES = 2

/**
 * @const {string} SPACER_ALIAS
 */
export const SPACER_ALIAS = 'space'

/**
 * @const {string} SPACER_SHORTCUT
 */
export const SPACER_SHORTCUT = 's'

/**
 * @const {string} BREAK_ALIAS
 */
export const BREAK_ALIAS = 'br'

/**
 * @const {Array} LINE_TAGS
 */
const LINE_TAGS = [
  BREAK_ALIAS,
  CHORD_SHORTCUT,
  CHORD_ALIAS,
  SPACER_SHORTCUT,
  SPACER_ALIAS
]

/**
 * @const {Array} BLOCKS_LIST
 */
export const BLOCKS_LIST: string[] = [
  TITLE_ALIAS,
  VERSE_TYPE_CODA,
  VERSE_TYPE_NOTE,
  VERSE_TYPE_CHORUS,
  VERSE_TYPE_INTRO,
  VERSE_TYPE_BRIDGE,
  VERSE_TYPE_DEFAULT,
  VERSE_TYPE_ASTERISM,
  VERSE_TYPE_EPIGRAPH,
  AUTHOR_TYPE_MUSIC,
  AUTHOR_TYPE_LYRICS,
  AUTHOR_TYPE_ARTIST,
  AUTHOR_TYPE_DEFAULT,
  AUTHOR_TYPE_TRANSLATION
]

/**
 * @const {Array} INLINES_LIST
 */
export const INLINES_LIST: string[] = [
  CHORD_ALIAS,
  CHORD_SHORTCUT,
  REPEAT_ALIAS,
  REPEAT_SHORTCUT,
  SPACER_ALIAS,
  SPACER_SHORTCUT
]

export interface VerseProps {
  chorded?: boolean
  type: string
  lines: (RepeatProps | (string | LineProps)[])[] | null
}

export interface LineProps {
  times?: number
  alone?: boolean
  value?: number | string
  type: string
}

export interface RepeatProps {
  chorded?: boolean
  type: string
  times: number
  lines: (string | LineProps)[]
}

export interface AuthorProps {
  id?: string,
  name: string
  type?: string
  count?: number
}

export interface AuthorGroup {
  type: string,
  list: AuthorProps[]
}

export interface ColorsProps {
  loop: number
  list: string[]
}

export interface SongInfo {
  id?: string
  tune?: TuneItems
  name: string
  chords: string[]
  colors?: ColorsProps
  verses: VerseProps[]
  authors: AuthorProps[] | AuthorGroup[]
}

/**
 * Order .chords array like this ['A', 'Am', 'B', 'Bm']
 *
 * @function orderChords
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function orderChords(a: string, b: string): number {
  const [a0, a1] = a.split('_')
  const [b0, b1] = b.split('_')

  const a2 = parseInt(a1)
  const b2 = parseInt(b1)

  if (a0 > b0) {
    return 1;
  } else if (a0 < b0) {
    return -1;
  } else {
    if (a2 > b2) {
      return 1;
    } else if (a2 < b2) {
      return -1;
    }
  }

  return 0;
}

/**
 * Order authors by author type and name
 *
 * @function orderAuthors
 * @param {object} a
 * @param {object} b
 * @returns {number}
 */
export function orderAuthors(a: AuthorProps, b: AuthorProps): number {
  const aType: string = `${a.type}`
  const bType: string = `${b.type}`

  if (AUTHOR_ORDER[aType] > AUTHOR_ORDER[bType]) {
    return 1;
  } else if (AUTHOR_ORDER[aType] < AUTHOR_ORDER[bType]) {
    return -1;
  } else {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    }
  }

  return 0;
}

/**
 * @class ChordsParser
 */
export default class ChordsParser {

  /**
   * @constructor
   * @param {string} raw
   */
  constructor(raw: string = '') {
    if (!raw) {
      return this
    }

    this._chordId = 0

    this.parse(raw)
  }

  /**
   * @private
   * @member {number} _chordId
   */
  _chordId: number = 0

  /**
   * @member {string} id
   */
  id: string = ''

  /**
   * @member {string} text
   */
  text: string = ''

  /**
   * @member {string} title
   */
  name: string = ''

  /**
   * @member {Array} chords
   */
  chords: string[] = []

  /**
   * @member {Array} verses
   */
  verses: VerseProps[] = []

  /**
   * @member {Array} authors
   */
  authors: AuthorProps[] = []

  /**
   * Rewrites standart valueOf method
   *
   * @method valueOf
   * @returns {object}
   */
  valueOf() {
    return this.parsed
  }

  /**
   * Rewrites standart toString method
   *
   * @method toString
   * @returns {string}
   */
  toString(): string {
    return this.json
  }

  /**
   * All main data as JSON string
   *
   * @member {object} json
   */
  get json() {
    return JSON.stringify(this.parsed);
  }

  /**
   * All main data as object
   *
   * @member {object} parsed
   */
  get parsed(): SongInfo {
    return {
      name: this.name,
      chords: this.chords,
      verses: this.verses,
      authors: this.authors
    }
  }

  get authorsByList(): AuthorProps[] {
    const ln0 = this.authors.length
    const list = <AuthorProps[]>[]

    if (!ln0) {
      return list
    }

    // Fill authors lists
    for (let it0 = 0; it0 < ln0; it0++) {
      const author = this.authors[it0] as AuthorProps
      const id = `${author.id}`
      const type = `${author.type}`
      const name = `${author.name}`

      list.push({ id, name, type })
    }

    return list
  }

  /**
   * Authors organized by their types
   *
   * @member {Array} authorsGroupedByType
   */
  get authorsGroupedByType(): AuthorGroup[] {
    const ln0 = this.authors.length
    const grouped: AuthorGroup[] = [] as AuthorGroup[]

    // No need to go further
    if (!ln0) {
      return grouped
    }

    // Fill groups array
    for (let al0 in AUTHOR_ORDER) {
      grouped[AUTHOR_ORDER[al0]] = {
        type: al0,
        list: []
      }
    }

    // Fill authors lists
    for (let it0 = 0; it0 < ln0; it0++) {
      const author = this.authors[it0] as AuthorProps
      const type = `${author.type}`
      const name = `${author.name}`

      grouped[AUTHOR_ORDER[type]].list.push({ name, type })
    }

    return grouped
  }

  /**
   * Clears all previously parsed data
   *
   * @method clear
   */
  clear() {
    this._chordId = 0
    this.name = TITLE_DEFAULT
    this.text = ''
    this.chords = []
    this.verses = []
    this.authors = []
  }

  /**
   * Starts parsing
   *
   * @method parse
   * @param {string} raw
   * @returns {object}
   */
  parse(raw: string = ''): SongInfo {
    this.clear()

    raw = this._parseTitle(raw)
    raw = this._parseAuthors(raw)
    raw = this._parseCommons(raw)

    // Save text only
    this.text = raw

    raw = this._parseVerses(raw)

    this.chords.sort(orderChords)

    return this.parsed
  }

  /**
   * Parses song title from [title] blocks
   *
   * @private
   * @method _parseTitle
   * @param {string} raw
   * @returns {string}
   */
  _parseTitle(raw: string): string {
    const seek = /\[title(="?([^"\]]*)"?)?\]([^\[]*)\[\/title\]\s*/
    const found = raw.match(new RegExp(seek, 'g'))

    // No need to go further
    if (!found || !found.length) {
      return raw
    }

    // There should be only one title
    for (let it0 = 0, ln0 = found.length; it0 < ln0; it0++) {
      if (it0 === 0) {
        const parsed = found[it0].match(seek)

        if (parsed && parsed.length === 4) {
          this.id = parsed[2] ? parsed[2] : ''
          this.name = parsed[3] ? this._parseCommons(parsed[3]) : TITLE_DEFAULT
        }
      }

      raw = raw.replace(found[it0], '')
    }

    return raw
  }

  /**
   * Add chord into .chords array
   *
   * @private
   * @method _parseChord
   * @param {string} raw
   * @returns {string}
   */
  _parseChord(raw: string) {
    // No need to go further
    if (!raw || this.chords.indexOf(raw) !== -1) {
      return
    }

    this.chords.push(raw)
  }

  /**
   * Parses single text line with [c(hord)="Am"] and [s(pacer)="3"]
   * into ['array of lines with ', {type: chord, value: 'Am'}, ' inserts']
   *
   * @private
   * @method _parseLine
   * @param {string} raw
   * @param {number} pos
   * @param {string} type
   * @param {object} repeat
   * @returns {Array}
   */
  _parseLine(raw: string, pos: number, type: string, repeat: RepeatProps | null, verse: VerseProps): (string | LineProps)[] {
    const types = LINE_TAGS.join('|')
    const rexp = new RegExp(`^(${types})(="?([^"]*)"?)?$`)
    const splited = raw.split(/[\[\]]/)
    let line = <(string | LineProps)[]>[]

    // Compile line array with chords objects and line pieces
    for (let it0 = 0, ln0 = splited.length; it0 < ln0; it0++) {
      const slice = splited[it0]
      const found = slice.match(rexp)

      let alone = false
      let value = ''

      if (found) {
        switch (found[1]) {

          case BREAK_ALIAS:
            line.push('\n')
            break

          // Insert chord object
          case CHORD_ALIAS:
          case CHORD_SHORTCUT:
            const next = splited[it0 + 1]

            alone = false
            value = found[3] ? found[3] : ''
            value = value.replace(/\s/g, '')

            // Sometimes chord isn't surrounded by text
            // and needs to be rendered other way
            if (!next || next == ' ' || next.match(rexp)) {
              alone = true
            }

            // Additional parsing
            if (value[0] == '{') {
              const direct = true

              value = value.replace(/(\d|barre|active|inactive|open|mute)(:)/g, '"$1"$2')

              switch (type) {

                case VERSE_TYPE_CODA:
                case VERSE_TYPE_INTRO:
                case VERSE_TYPE_BRIDGE:
                  value = `{"title":"","chord":${value}}`
                  break

                default:
                  this._chordId++

                  value = `{"title":"${this._chordId}","chord":${value}}`
                  break

              }
            } else {
              value = value.
                replace(SHARP_REXP, `$1${SHARP_SYMBOL}`).
                replace(FLAT_REXP, `$1${FLAT_SYMBOL}`)
            }

            // Save chord object into line
            line.push({ type: CHORD_ALIAS, alone, value })

            // Repeat section or verse contain chords
            if (pos === 0 && repeat) {
              repeat.chorded = true
              verse.chorded = true
            } else if (pos === 0) {
              //verse.chorded = true
            }

            // Don't save chords in list for codas, intros
            // and bridges
            switch (type) {

              case VERSE_TYPE_NOTE:
              case VERSE_TYPE_CHORUS:
              case VERSE_TYPE_DEFAULT:
              case VERSE_TYPE_EPIGRAPH:
                this._parseChord(value)
                break

            }
            break

          // Insert spacer object
          case SPACER_ALIAS:
          case SPACER_SHORTCUT:
            line.push({
              type: SPACER_ALIAS,
              value: parseInt(found[3]) || SPACER_TIMES
            })
            break

        }
      } else if (slice) {
        // Insert piece of string
        line.push(slice)
      }
    }

    return line
  }

  /**
   * Parses all lines in a given verse, also parses [repeat][/repeat] blocks
   *
   * @private
   * @method _parseLines
   * @param {string} raw
   * @param {string} type
   * @returns {Array}
   */
  _parseLines(raw: string, type: string, verse: VerseProps): (RepeatProps | (string | LineProps)[])[] | null {
    let it1 = 0
    const brexp = /(\[r(epeat)?(="?(\d+)"?)?\])\s*/
    const erexp = /\s*(\[\/r(epeat)?\])/
    const lines = []
    let repeat = null as RepeatProps | null
    let parsed = raw.
      replace(brexp, '$1').
      replace(erexp, '$1').
      split(/\n/)

    // No need to go further
    if (!parsed.length) {
      return null
    }

    // Iterate through the parsed lines
    for (let it0 = 0, ln0 = parsed.length; it0 < ln0; it0++) {
      let line = parsed[it0]

      if (line) {
        if (repeat) {
          // Close [repeat] block
          const found = line.match(erexp)

          if (found) {
            line = line.replace(found[0], '')

            // @ts-ignore
            repeat.lines.push(this._parseLine(line, it1, type, repeat, verse))

            it1 = 0
            repeat = null
          } else {
            // @ts-ignore
            repeat.lines.push(this._parseLine(line, it1, type, repeat, verse))

            it1++
          }
        } else {
          let found = line.match(brexp)

          if (found) {
            // Open [repeat] block
            line = line.replace(found[0], '')

            repeat = {
              type: REPEAT_ALIAS,
              times: parseInt(found[4]) || REPEAT_TIMES,
              lines: []
            } as RepeatProps

            // Close [repeat] block for single line
            found = line.match(erexp);

            if (found) {
              line = line.replace(found[0], '')
            }

            // @ts-ignore
            repeat.lines.push(this._parseLine(line, it1, type, repeat, verse))

            it1++

            lines.push(repeat)

            if (found) {
              repeat = null
            }
          } else {
            lines.push(this._parseLine(line, it1, type, repeat, verse))
          }
        }
      }
    }

    return lines
  }

  /**
   * Parses single verse and [coda], [note], [chorus], [intro], [bridge],
   * [asterism] and [epigraph] blocks
   *
   * @private
   * @method _parseVerse
   * @param {string} raw
   * @returns {object}
   */
  _parseVerse(raw: string): VerseProps {
    const types = VERSE_TYPES.join('|')
    const brexp = new RegExp(`^\\[(${types})\\]\s*`)
    const erexp = new RegExp(`\s*\\[\\/(${types})\\]$`)
    let type = VERSE_TYPE_DEFAULT
    let found = raw.match(brexp)
    let verse = <VerseProps>{}

    let lines = null

    if (found) {
      type = found[1];

      raw = raw.replace(found[0], '')
      found = raw.match(erexp)

      if (found) {
        raw = raw.replace(found[0], '')
      }
    }

    lines = this._parseLines(raw, type, verse)

    return { chorded: Boolean(verse.chorded), type, lines }
  }

  /**
   * Parses all verses in text by /n/n
   *
   * @private
   * @method _parseVerses
   * @param {string} raw
   * @returns {string}
   */
  _parseVerses(raw: string): string {
    let verses = raw.split(/\n{2,}/)

    if (!verses.length) {
      return raw
    }

    for (let it0 = 0, ln0 = verses.length; it0 < ln0; it0++) {
      const verse = this._parseVerse(verses[it0])

      if (verse) {
        this.verses.push(verse)
      }
    }

    return raw
  }

  /**
   * Parses song author name and author type
   *
   * @private
   * @method _parseAuthor
   * @param {string} found
   * @param {string} types
   * @param {string} raw
   * @returns {string}
   */
  _parseAuthor(found: string, types: string, raw: string): string {
    const rexp = new RegExp(`\\[\/?(${types})(="?([^"*\\]]*)"?)?\\]\\s*`)
    const tmp = found.match(rexp)

    const id = tmp && tmp[3] ? tmp[3] : null
    const type = tmp && tmp[1] ? tmp[1] : 'author'
    const name = found.replace(new RegExp(rexp, 'g'), '')

    this.authors.push({ id, type, name } as AuthorProps)

    return raw.replace(found, '')
  }

  /**
   * Parses all authors in text by [author], [written], [composed]
   * and [translated] blocks
   *
   * @private
   * @method _parseAuthors
   * @param {string} raw
   * @returns {string}
   */
  _parseAuthors(raw: string): string {
    const types = AUTHOR_TYPES.join('|')
    const seek = new RegExp(`\\[(${types})(="?[^"\\]]*"?)?\\][^\\[]*\\[\\/(${types})\\]\\s*`, 'g')
    const found = raw.match(seek)

    // No need to go further
    if (!found || !found.length) {
      return raw
    }

    for (let it0 = 0, ln0 = found.length; it0 < ln0; it0++) {
      raw = this._parseAuthor(found[it0], types, raw)
    }

    this.authors.sort(orderAuthors)

    return raw
  }

  /**
   * Cleans text from parasite spaces and other stuff
   *
   * @private
   * @method _parseCommons
   * @param {string} raw
   * @returns {string}
   */
  _parseCommons(raw: string): string {
    const types = BLOCKS_LIST.join('|');

    return raw.
    replace(/(\d+)\s*:\s*-1/g, '$1:false').
    replace(/(\d+)\s*:\s*0/g, '$1:true').
    replace(/\s{1,}([.,:;!?]|\.\.\.)/g, '$1').
    replace(/--/g, '—').
    replace(/(\s{1,})-/g, '$1—').
    replace(/([.]{3})/g, '…').
    replace(/_{2,}/g, (raw) => `[s="${raw.length}"]`).
    replace(new RegExp(`(\n{1}\\[(${types})\\])`), '\n\n$1').
    replace(new RegExp(`(\\[\\/(${types})\\])\n{1}`), '$1\n\n').
    replace(/\t/g, ' ').
    replace(/\r/g, '').
    replace(/ {3,}/g, '  ').
    replace(/\n{3,}/g, '\n\n').
    replace(/^\s+/, '').
    replace(/\s+$/, '')
  }

}
