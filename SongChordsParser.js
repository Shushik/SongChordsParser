/**
 * Song text parser
 *
 * @author Shushik <silkleopard@yandex.ru>
 * @version 1.0
 * @license MIT
 */

/**
 * @const {string} TITLE_DEFAULT
 */
const TITLE_DEFAULT = '* * *';

/**
 * @const {string} AUTHOR_TYPE_DEFAULT
 */
const AUTHOR_TYPE_DEFAULT = 'author';

/**
 * @const {string} AUTHOR_TYPE_MUSIC
 */
const AUTHOR_TYPE_MUSIC = 'composed';

/**
 * @const {string} AUTHOR_TYPE_LYRICS
 */
const AUTHOR_TYPE_LYRICS = 'written';

/**
 * @const {string} AUTHOR_TYPE_TRANSLATION
 */
const AUTHOR_TYPE_TRANSLATION = 'translated';

/**
 * @const {Array} AUTHOR_TYPES
 */
const AUTHOR_TYPES = [
    AUTHOR_TYPE_MUSIC,
    AUTHOR_TYPE_LYRICS,
    AUTHOR_TYPE_DEFAULT,
    AUTHOR_TYPE_TRANSLATION
];

/**
 * @const {object} AUTHOR_ORDER
 */
const AUTHOR_ORDER = {
    [AUTHOR_TYPE_MUSIC]: 2,
    [AUTHOR_TYPE_LYRICS]: 3,
    [AUTHOR_TYPE_DEFAULT]: 1,
    [AUTHOR_TYPE_TRANSLATION]: 4
};

/**
 * @const {string} VERSE_TYPE_CODA
 */
const VERSE_TYPE_CODA = 'coda';

/**
 * @const {string} VERSE_TYPE_NOTE
 */
const VERSE_TYPE_NOTE = 'note';

/**
 * @const {string} VERSE_TYPE_CHORUS
 */
const VERSE_TYPE_CHORUS = 'chorus';

/**
 * @const {string} VERSE_TYPE_INTRO
 */
const VERSE_TYPE_INTRO = 'intro';

/**
 * @const {string} VERSE_TYPE_BRIDGE
 */
const VERSE_TYPE_BRIDGE = 'bridge';

/**
 * @const {string} VERSE_TYPE_DEFAULT
 */
const VERSE_TYPE_DEFAULT = 'verse';

/**
 * @const {string} VERSE_TYPE_ASTERISM
 */
const VERSE_TYPE_ASTERISM = 'asterism';

/**
 * @const {string} VERSE_TYPE_EPIGRAPH
 */
const VERSE_TYPE_EPIGRAPH = 'epigraph';

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
const REPEAT_ALIAS = 'repeat';

/**
 * @const {string} CHORD_ALIAS
 */
const CHORD_ALIAS = 'chord';

/**
 * @const {string} CHORD_SHORTCUT
 */
const CHORD_SHORTCUT = 'c';

/**
 * @const {number} SPACER_TIMES
 */
const SPACER_TIMES = 2;

/**
 * @const {string} SPACER_ALIAS
 */
const SPACER_ALIAS = 'space';

/**
 * @const {string} SPACER_SHORTCUT
 */
const SPACER_SHORTCUT = 's';

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
 * @class SongChordsParser
 */
export default class Self {

    /**
     * @constructor
     * @param {string} raw
     */
    constructor(raw = '') {
        this.parse(raw);
    }

    /**
     * @member {object} json
     */
    get json() {
        return JSON.stringify(this.parsed);
    }

    /**
     * @member {object} parsed
     */
    get parsed() {
        let {title, chords, verses, authors} = this;

        return {title, chords, verses, authors};
    }

    /**
     * @method parse
     * @param {string} raw
     * @returns {object}
     */
    parse(raw = '') {
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

        raw = this._parseTitle(raw);
        raw = this._parseAuthors(raw);
        raw = this._parseCommons(raw);
        raw = this._parseVerses(raw);

        this.chords.sort(this._orderChords);

        return this.parsed;
    }

    /**
     * @method valueOf
     * @returns {object}
     */
    valueOf() {
        return this.parsed;
    }

    /**
     * @method toString
     * @returns {string}
     */
    toString() {
        return this.json;
    }

    /**
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
     * @private
     * @method _parseTitle
     * @param {string} raw
     * @returns {string}
     */
    _parseTitle(raw) {
        let it0 = 0;
        let ln0 = 0;
        let seek = /\[title\][^\[]*\[\/title\]\s*/g
        let found = raw.match(seek);

        // No need to go further
        if (!found || !found.length) {
            return raw;
        }

        // There should be only one title
        for (ln0 = found.length; it0 < ln0; it0++) {
            if (it0 === 0) {
                this.title = `${found[it0]}`.
                             replace(/\[\/?title\]\s*/g, '');
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
        if (this.chords.indexOf(raw) !== -1) {
            return;
        }

        this.chords.push(raw);
    }

    /**
     * Order .chords array like this ['A', 'Am', 'B', 'Bm']
     *
     * @private
     * @method _orderChords
     * @param {string} a
     * @param {string} b
     * @returns {number}
     */
    _orderChords(a, b) {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }

        return 0;
    }

    /**
     * Parses single text line with [c(hord)="Am"] and [s(pacer)="3"]
     * into ['array of lines with ', {type: chord, value: 'Am'}, ' inserts']
     *
     * @private
     * @method _parseLine
     * @param {string} raw
     * @returns {Array}
     */
    _parseLine(raw) {
        let it0 = 0;
        let ln0 = 0;
        let types = LINE_TAGS.join('|');
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
                        line.push({
                            type: CHORD_ALIAS,
                            value: found[3]
                        });

                        this._parseChord(found[3]);
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
     * @returns {Array}
     */
    _parseLines(raw) {
        let it0 = 0;
        let ln0 = 0;
        let brexp = /(\[repeat(="(\d+)")?\])\s*/;
        let erexp = /\s*(\[\/repeat\])/;
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
                        repeat.lines.push(this._parseLine(line));
                        repeat = null;
                    } else {
                        repeat.lines.push(this._parseLine(line));
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

                        repeat.lines.push(this._parseLine(line));

                        lines.push(repeat);

                        if (found) {
                            repeat = null;
                        }
                    } else {
                        lines.push(this._parseLine(line))
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
        let brexp = new RegExp(`^\\[(${types})\\]\s*`);
        let erexp = new RegExp(`\s*\\[\\/(${types})\\]$`);
        let found = raw.match(brexp);
        let lines = null;

        if (found) {
            type = found[1];

            raw = raw.replace(found[0], '');
            found = raw.match(erexp);

            if (found) {
                raw = raw.replace(found[0], '');
            }
        }

        lines = this._parseLines(raw);

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
     * Order authors by author type and name
     *
     * @private
     * @method _orderAuthors
     * @param {object} a
     * @param {object} b
     * @returns {number}
     */
    _orderAuthors(a, b) {
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

        this.authors.sort(this._orderAuthors);

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
        raw = raw.
              replace(/\t/g, ' ').
              replace(/\r/, '').
              replace(/ {3,}/g, '  ').
              replace(/\n{3,}/g, '\n\n').
              replace(/^\s+/, '').
              replace(/\s+$/, '');

        return raw;
    }

}
