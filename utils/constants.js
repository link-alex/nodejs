const options = {
    help: {
        SHORT: '-h',
        LONG: '--help'
    },
    action: {
        SHORT: '-a',
        LONG: '--action'
    },
    file: {
        SHORT: '-f',
        LONG: '--file'
    },
    path: {
        SHORT: '-p',
        LONG: '--path'
    }
};

const actions = {
    BUNDLE_CSS: 'bundle-css',
    IO: 'io',
    TRANSFORM: 'transform',
    TRANSFORM_FILE: 'transform-file',
    TRANSFORM_AND_SAVE_FILE: 'transform-save-file'
};

module.exports = {
    options,
    actions
};
