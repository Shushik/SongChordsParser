/**
 * Song text parser
 *
 * @author Shushik <silkleopard@yandex.ru>
 * @version 1.0
 * @license MIT
 */

/**
 * @const {string} FLAT_SYMBOL
 */
export const FLAT_SYMBOL = '♭';

/**
 * @const {RegExp} FLAT_REXP
 */
export const FLAT_REXP = /([ABCDEFG])b/g;

/**
 * @const {string} BEKAR_SYMBOL
 */
export const BEKAR_SYMBOL = '♮';

/**
 * @const {string} SHARP_SYMBOL
 */
export const SHARP_SYMBOL = '♯';

/**
 * @const {RegExp} SHARP_REXP
 */
export const SHARP_REXP = /([ABCDEFG])#/g;

/**
 * @const {string} TITLE_DEFAULT
 */
const TITLE_DEFAULT = '* * *';

/**
 * @const {string} TITLE_ALIAS
 */
export const TITLE_ALIAS = 'title';

/**
 * @const {string} ASTERISM_DEFAULT
 */
const ASTERISM_DEFAULT = TITLE_DEFAULT;

/**
 * @const {string} AUTHOR_TYPE_MUSIC
 */
export const AUTHOR_TYPE_MUSIC = 'composed';

/**
 * @const {string} AUTHOR_TYPE_LYRICS
 */
export const AUTHOR_TYPE_LYRICS = 'written';

/**
 * @const {string} AUTHOR_TYPE_ARTIST
 */
export const AUTHOR_TYPE_ARTIST = 'performed';

/**
 * @const {string} AUTHOR_TYPE_DEFAULT
 */
export const AUTHOR_TYPE_DEFAULT = 'author';

/**
 * @const {string} AUTHOR_TYPE_TRANSLATION
 */
export const AUTHOR_TYPE_TRANSLATION = 'translated';

/**
 * @const {Array} AUTHOR_TYPES
 */
const AUTHOR_TYPES = [
    AUTHOR_TYPE_MUSIC,
    AUTHOR_TYPE_ARTIST,
    AUTHOR_TYPE_LYRICS,
    AUTHOR_TYPE_DEFAULT,
    AUTHOR_TYPE_TRANSLATION
];

/**
 * @const {object} AUTHOR_ORDER
 */
const AUTHOR_ORDER = {
    [AUTHOR_TYPE_MUSIC]: 1,
    [AUTHOR_TYPE_ARTIST]: 4,
    [AUTHOR_TYPE_LYRICS]: 2,
    [AUTHOR_TYPE_DEFAULT]: 0,
    [AUTHOR_TYPE_TRANSLATION]: 3
};

/**
 * @const {string} VERSE_TYPE_CODA
 */
export const VERSE_TYPE_CODA = 'coda';

/**
 * @const {string} VERSE_TYPE_NOTE
 */
export const VERSE_TYPE_NOTE = 'note';

/**
 * @const {string} VERSE_TYPE_INTRO
 */
export const VERSE_TYPE_INTRO = 'intro';

/**
 * @const {string} VERSE_TYPE_BRIDGE
 */
export const VERSE_TYPE_BRIDGE = 'bridge';

/**
 * @const {string} VERSE_TYPE_CHORUS
 */
export const VERSE_TYPE_CHORUS = 'chorus';

/**
 * @const {string} VERSE_TYPE_DEFAULT
 */
export const VERSE_TYPE_DEFAULT = 'verse';

/**
 * @const {string} VERSE_TYPE_ASTERISM
 */
export const VERSE_TYPE_ASTERISM = 'asterism';

/**
 * @const {string} VERSE_TYPE_EPIGRAPH
 */
export const VERSE_TYPE_EPIGRAPH = 'epigraph';

/**
 * @const {Array} VERSE_TYPES
 */
const VERSE_TYPES = [
    VERSE_TYPE_CODA,
    VERSE_TYPE_NOTE,
    VERSE_TYPE_CHORUS,
    VERSE_TYPE_INTRO,
    VERSE_TYPE_BRIDGE,
    VERSE_TYPE_DEFAULT,
    VERSE_TYPE_ASTERISM,
    VERSE_TYPE_EPIGRAPH
];

/**
 * @const {number} REPEAT_TIMES
 */
const REPEAT_TIMES = 2;

/**
 * @const {string} REPEAT_ALIAS
 */
export const REPEAT_ALIAS = 'repeat';

/**
 * @const {string} REPEAT_SHORTCUT
 */
export const REPEAT_SHORTCUT = 'r';

/**
 * @const {string} CHORD_ALIAS
 */
export const CHORD_ALIAS = 'chord';

/**
 * @const {string} CHORD_SHORTCUT
 */
export const CHORD_SHORTCUT = 'c';

/**
 * @const {number} SPACER_TIMES
 */
const SPACER_TIMES = 2;

/**
 * @const {string} SPACER_ALIAS
 */
export const SPACER_ALIAS = 'space';

/**
 * @const {string} SPACER_SHORTCUT
 */
export const SPACER_SHORTCUT = 's';

/**
 * @const {Array} LINE_TAGS
 */
const LINE_TAGS = [
    CHORD_SHORTCUT,
    CHORD_ALIAS,
    SPACER_SHORTCUT,
    SPACER_ALIAS
];

/**
 * @const {Array} BLOCKS_LIST
 */
export const BLOCKS_LIST = [
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
];

/**
 * @const {Array} INLINES_LIST
 */
export const INLINES_LIST = [
    CHORD_ALIAS,
    CHORD_SHORTCUT,
    REPEAT_ALIAS,
    REPEAT_SHORTCUT,
    SPACER_ALIAS,
    SPACER_SHORTCUT
];

/**
 * Order .chords array like this ['A', 'Am', 'B', 'Bm']
 *
 * @function orderChords
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function orderChords(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
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
export function orderAuthors(a, b) {
    if (AUTHOR_ORDER[a.type] > AUTHOR_ORDER[b.type]) {
        return 1;
    } else if (AUTHOR_ORDER[a.type] < AUTHOR_ORDER[b.type]) {
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
 * @class SongChordsParser
 */
export default class Self {

    /**
     * @constructor
     * @param {string} raw
     */
    constructor(raw = '') {
        this._chordId = 0;

        this.parse(raw);
    }

    /**
     * Rewrites standart valueOf method
     *
     * @method valueOf
     * @returns {object}
     */
    valueOf() {
        return this.parsed;
    }

    /**
     * Rewrites standart toString method
     *
     * @method toString
     * @returns {string}
     */
    toString() {
        return this.json;
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
    get parsed() {
        let {title, chords, verses, authors} = this;

        return {title, chords, verses, authors};
    }

    /**
     * Authors organized by their types
     *
     * @member {Array} authorsGroupedByType
     */
    get authorsGroupedByType() {
        let it0 = 0;
        let ln0 = this.authors.length;
        let al0 = '';
        let author = null;
        let grouped = [];

        // No need to go further
        if (!ln0) {
            return grouped;
        }

        // Fill groups array
        for (al0 in AUTHOR_ORDER) {
            grouped[AUTHOR_ORDER[al0]] = {
                type: al0,
                list: []
            };
        }

        // Fill authors lists
        for (; it0 < ln0; it0++) {
            author = this.authors[it0];

            grouped[AUTHOR_ORDER[author.type]].list.push(author.name);
        }

        return grouped;
    }

    /**
     * Clears all previously parsed data
     *
     * @method clear
     */
    clear() {
        /**
         * @private
         * @member {number} _chordId
         */
        this._chordId = 0;

        /**
         * @member {string} title
         */
        this.title = TITLE_DEFAULT;

        /**
         * @member {Array} chords
         */
        this.chords = [];

        /**
         * @member {Array} verses
         */
        this.verses = [];

        /**
         * @member {Array} authors
         */
        this.authors = [];
    }

    /**
     * Starts parsing
     *
     * @method parse
     * @param {string} raw
     * @returns {object}
     */
    parse(raw = '') {
        this.clear();

        raw = this._parseTitle(raw);
        raw = this._parseAuthors(raw);
        raw = this._parseCommons(raw);
        raw = this._parseVerses(raw);

        this.chords.sort(orderChords);

        return this.parsed;
    }

    /**
     * Parses song title from [title] blocks
     *
     * @private
     * @method _parseTitle
     * @param {string} raw
     * @returns {string}
     */
    _parseTitle(raw) {
        let it0 = 0;
        let ln0 = 0;
        let title = '';
        let seek = /\[title\][^\[]*\[\/title\]\s*/g;
        let found = raw.match(seek);

        // No need to go further
        if (!found || !found.length) {
            return raw;
        }

        // There should be only one title
        for (ln0 = found.length; it0 < ln0; it0++) {
            if (it0 === 0) {
                title = `${found[it0]}`.replace(/\[\/?title\]\s*/g, '');
                title = title || TITLE_DEFAULT;

                this.title = title;
            }

            raw = raw.replace(found[it0], '');
        }

        return raw;
    }

    /**
     * Add chord into .chords array
     *
     * @private
     * @method _parseChord
     * @param {string} raw
     * @returns {string}
     */
    _parseChord(raw) {
        // No need to go further
        if (!raw || this.chords.indexOf(raw) !== -1) {
            return;
        }

        this.chords.push(raw);
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
    _parseLine(raw, pos, type, repeat) {
        let alone = false;
        let direct = false;
        let it0 = 0;
        let ln0 = 0;
        let next = '';
        let types = LINE_TAGS.join('|');
        let value = '';
        let rexp = new RegExp(`^(${types})(="([^"]*)")?$`);
        let line = [];
        let found = null;
        let slice = null;
        let splited = raw.split(/[\[\]]/);

        // Compile line array with chords objects and line pieces
        for (ln0 = splited.length; it0 < ln0; it0++) {
            slice = splited[it0];
            found = slice.match(rexp);

            if (found) {
                switch (found[1]) {

                    // Insert chord object
                    case CHORD_ALIAS:
                    case CHORD_SHORTCUT:
                        next = splited[it0 + 1];
                        alone = false;
                        value = found[3] ? found[3] : '';
                        value = value.replace(/\s/g, '');

                        // Sometimes chord isn't surrounded by text
                        // and needs to be rendered other way
                        if (!next || next == ' ' || next.match(rexp)) {
                            alone = true;
                        }

                        // Additional parsing
                        if (value[0] == '{') {
                            direct = true;
                            value = value.replace(
                                        /(\d|barre|active|inactive|open|mute)(:)/g,
                                        '"$1"$2'
                                    );

                            switch (type) {

                                case VERSE_TYPE_CODA:
                                case VERSE_TYPE_INTRO:
                                case VERSE_TYPE_BRIDGE:
                                    value = `{"title":"","chord":${value}}`;
                                    break;

                                default:
                                    this._chordId++;

                                    value = `{"title":"${this._chordId}","chord":${value}}`;
                                    break;

                            }
                        } else {
                            value = value.
                                    replace(SHARP_REXP, `$1${SHARP_SYMBOL}`).
                                    replace(FLAT_REXP, `$1${FLAT_SYMBOL}`);
                        }

                        // Save chord object into line
                        line.push({
                            type: CHORD_ALIAS,
                            alone,
                            value
                        });

                        // Repeat section contain chords
                        if (pos === 0 && repeat) {
                            repeat.chorded = true;
                        }

                        // Don't save chords in list for codas, intros
                        // and bridges
                        switch (type) {

                            case VERSE_TYPE_NOTE:
                            case VERSE_TYPE_CHORUS:
                            case VERSE_TYPE_DEFAULT:
                            case VERSE_TYPE_EPIGRAPH:
                                this._parseChord(value);
                                break;

                        }
                        break;

                    // Insert spacer object
                    case SPACER_ALIAS:
                    case SPACER_SHORTCUT:
                        line.push({
                            type: SPACER_ALIAS,
                            value: (found[3] - 0) || SPACER_TIMES
                        });
                        break;

                }
            } else if (slice) {
                // Insert piece of string
                line.push(slice);
            }
        }

        return line;
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
    _parseLines(raw, type) {
        let it0 = 0;
        let ln0 = 0;
        let it1 = 0;
        let brexp = /(\[r(epeat)(="(\d+)")?\])\s*/;
        let erexp = /\s*(\[\/r(epeat)\])/;
        let line = null;
        let found = null;
        let lines = [];
        let repeat = null;
        let parsed = raw.
                     replace(brexp, '$1').
                     replace(erexp, '$1').
                     split(/\n/);

        // No need to go further
        if (!parsed.length) {
            return null;
        }

        // Iterate through the parsed lines
        for (ln0 = parsed.length; it0 < ln0; it0++) {
            line = parsed[it0];

            if (line) {
                if (repeat) {
                    // Close [repeat] block
                    found = line.match(erexp);

                    if (found) {
                        line = line.replace(found[0], '');

                        repeat.lines.push(this._parseLine(line, it1, type, repeat));

                        it1 = 0;
                        repeat = null;
                    } else {
                        repeat.lines.push(this._parseLine(line, it1, type, repeat));

                        it1++;
                    }
                } else {
                    found = line.match(brexp);

                    if (found) {
                        // Open [repeat] block
                        line = line.replace(found[0], '');

                        repeat = {
                            type: REPEAT_ALIAS,
                            times: (found[3] - 0) || REPEAT_TIMES,
                            lines: []
                        };

                        // Close [repeat] block for single line
                        found = line.match(erexp);

                        if (found) {
                            line = line.replace(found[0], '');
                        }

                        repeat.lines.push(this._parseLine(line, it1, type, repeat));

                        it1++;

                        lines.push(repeat);

                        if (found) {
                            repeat = null;
                        }
                    } else {
                        lines.push(this._parseLine(line, it1, type, repeat));
                    }
                }
            }
        }

        return lines;
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
    _parseVerse(raw) {
        let type = VERSE_TYPE_DEFAULT;
        let types = VERSE_TYPES.join('|');
        let content = '';
        let brexp = new RegExp(`^\\[(${types})\\]\s*`);
        let erexp = new RegExp(`\s*\\[\\/(${types})\\]$`);
        let found = raw.match(brexp);
        let lines = null;

        if (found) {
            type = found[1];

            raw = raw.replace(found[0], content);
            found = raw.match(erexp);

            if (found) {
                raw = raw.replace(found[0], '');
            }
        }

        lines = this._parseLines(raw, type);

        return {type, lines};
    }

    /**
     * Parses all verses in text by /n/n
     *
     * @private
     * @method _parseVerses
     * @param {string} raw
     * @returns {string}
     */
    _parseVerses(raw) {
        let it0 = 0;
        let ln0 = 0;
        let verse = '';
        let verses = raw.split(/\n{2,}/);

        if (!verses.length) {
            return raw;
        }

        for (ln0 = verses.length; it0 < ln0; it0++) {
            verse = this._parseVerse(verses[it0]);

            if (verse) {
                this.verses.push(verse);
            }
        }

        return raw;
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
    _parseAuthor(found, types, raw) {
        let rexp = new RegExp(`\\[\\/?(${types})\\]\\s*`, 'g');
        let type = found.match(rexp)[0].replace(/[\[\]]/g, '');
        let name = found.replace(rexp, '');

        this.authors.push({type, name});

        return raw.replace(found, '');
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
    _parseAuthors(raw) {
        let it0 = 0;
        let ln0 = 0;
        let section = '';
        let types = AUTHOR_TYPES.join('|');
        let seek = new RegExp(
                       `\\[(${types})\\][^\\[]*\\[\\/(${types})\\]\\s*`,
                       'g'
                   );
        let found = raw.match(seek);

        // No need to go further
        if (!found || !found.length) {
            return raw;
        }

        for (ln0 = found.length; it0 < ln0; it0++) {
            raw = this._parseAuthor(found[it0], types, raw);
        }

        this.authors.sort(orderAuthors);

        return raw;
    }

    /**
     * Cleans text from parasite spaces and other stuff
     *
     * @private
     * @method _parseCommons
     * @param {string} raw
     * @returns {string}
     */
    _parseCommons(raw) {
        let types = BLOCKS_LIST.join('|');

        raw = raw.
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
              replace(/\r/, '').
              replace(/ {3,}/g, '  ').
              replace(/\n{3,}/g, '\n\n').
              replace(/^\s+/, '').
              replace(/\s+$/, '');

        return raw;
    }

}
