function getSubstring(str, char1, char2) {
    return str.substring(
      str.indexOf(char1) + 1,
      str.lastIndexOf(char2)
    );
  }
  