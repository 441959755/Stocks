
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        let data = [

            { "day": "20180129", "open": 1797, "close": 1795, "high": 1799, "low": 1792, "value": 230608, "ccl_hold": 876402 }, { "day": "20180130", "open": 1793, "close": 1792, "high": 1799, "low": 1790, "value": 191622, "ccl_hold": 859114 }, { "day": "20180131", "open": 1791, "close": 1788, "high": 1797, "low": 1785, "value": 295636, "ccl_hold": 846334 }, { "day": "20180201", "open": 1790, "close": 1805, "high": 1807, "low": 1787, "value": 492456, "ccl_hold": 856802 }, { "day": "20180202", "open": 1806, "close": 1804, "high": 1809, "low": 1800, "value": 270476, "ccl_hold": 817970 }, { "day": "20180205", "open": 1810, "close": 1816, "high": 1824, "low": 1809, "value": 434632, "ccl_hold": 882426 }, { "day": "20180206", "open": 1816, "close": 1815, "high": 1819, "low": 1808, "value": 300948, "ccl_hold": 814194 }, { "day": "20180207", "open": 1820, "close": 1825, "high": 1828, "low": 1816, "value": 355150, "ccl_hold": 816130 }, { "day": "20180208", "open": 1825, "close": 1826, "high": 1830, "low": 1820, "value": 247250, "ccl_hold": 778036 }, { "day": "20180209", "open": 1828, "close": 1824, "high": 1832, "low": 1817, "value": 367656, "ccl_hold": 808390 }, { "day": "20180212", "open": 1823, "close": 1818, "high": 1826, "low": 1814, "value": 299522, "ccl_hold": 767514 }, { "day": "20180213", "open": 1820, "close": 1800, "high": 1820, "low": 1797, "value": 408506, "ccl_hold": 712290 }, { "day": "20180214", "open": 1798, "close": 1812, "high": 1813, "low": 1796, "value": 200064, "ccl_hold": 717432 }, { "day": "20180222", "open": 1815, "close": 1819, "high": 1822, "low": 1809, "value": 246162, "ccl_hold": 734594 }, { "day": "20180223", "open": 1817, "close": 1813, "high": 1822, "low": 1808, "value": 293750, "ccl_hold": 761608 }, { "day": "20180226", "open": 1819, "close": 1829, "high": 1837, "low": 1815, "value": 574940, "ccl_hold": 862952 }, { "day": "20180227", "open": 1830, "close": 1828, "high": 1831, "low": 1824, "value": 249386, "ccl_hold": 835338 }, { "day": "20180228", "open": 1823, "close": 1830, "high": 1833, "low": 1823, "value": 274142, "ccl_hold": 867672 }, { "day": "20180301", "open": 1836, "close": 1828, "high": 1839, "low": 1827, "value": 394478, "ccl_hold": 842944 }, { "day": "20180302", "open": 1831, "close": 1840, "high": 1854, "low": 1827, "value": 598408, "ccl_hold": 899984 }, { "day": "20180305", "open": 1845, "close": 1869, "high": 1873, "low": 1841, "value": 677752, "ccl_hold": 894298 }, { "day": "20180306", "open": 1870, "close": 1877, "high": 1884, "low": 1870, "value": 414430, "ccl_hold": 923466 }, { "day": "20180307", "open": 1879, "close": 1857, "high": 1879, "low": 1852, "value": 454610, "ccl_hold": 875688 }, { "day": "20180308", "open": 1853, "close": 1844, "high": 1854, "low": 1832, "value": 535206, "ccl_hold": 825512 }, { "day": "20180309", "open": 1848, "close": 1832, "high": 1851, "low": 1831, "value": 314642, "ccl_hold": 802082 }, { "day": "20180312", "open": 1830, "close": 1820, "high": 1832, "low": 1818, "value": 314906, "ccl_hold": 745186 }, { "day": "20180313", "open": 1821, "close": 1823, "high": 1825, "low": 1813, "value": 228602, "ccl_hold": 722140 }, { "day": "20180314", "open": 1821, "close": 1818, "high": 1825, "low": 1818, "value": 179408, "ccl_hold": 681948 }, { "day": "20180315", "open": 1764, "close": 1764, "high": 1769, "low": 1762, "value": 151990, "ccl_hold": 743084 }, { "day": "20180316", "open": 1766, "close": 1770, "high": 1773, "low": 1765, "value": 104698, "ccl_hold": 760240 }, { "day": "20180319", "open": 1771, "close": 1765, "high": 1774, "low": 1762, "value": 126192, "ccl_hold": 763764 }, { "day": "20180320", "open": 1766, "close": 1760, "high": 1768, "low": 1755, "value": 201078, "ccl_hold": 777814 }, { "day": "20180321", "open": 1760, "close": 1755, "high": 1762, "low": 1755, "value": 101276, "ccl_hold": 797018 }, { "day": "20180322", "open": 1755, "close": 1745, "high": 1756, "low": 1743, "value": 258930, "ccl_hold": 832814 }, { "day": "20180323", "open": 1744, "close": 1751, "high": 1755, "low": 1739, "value": 299226, "ccl_hold": 853168 }, { "day": "20180326", "open": 1756, "close": 1759, "high": 1763, "low": 1744, "value": 356924, "ccl_hold": 904004 }, { "day": "20180327", "open": 1759, "close": 1745, "high": 1759, "low": 1741, "value": 233170, "ccl_hold": 915660 }, { "day": "20180328", "open": 1745, "close": 1746, "high": 1751, "low": 1740, "value": 229114, "ccl_hold": 892542 }, { "day": "20180329", "open": 1745, "close": 1743, "high": 1749, "low": 1741, "value": 161278, "ccl_hold": 900530 }, { "day": "20180330", "open": 1748, "close": 1744, "high": 1750, "low": 1741, "value": 245582, "ccl_hold": 931384 }, { "day": "20180402", "open": 1746, "close": 1750, "high": 1756, "low": 1735, "value": 448150, "ccl_hold": 967770 }, { "day": "20180403", "open": 1749, "close": 1745, "high": 1755, "low": 1744, "value": 242072, "ccl_hold": 966050 }, { "day": "20180404", "open": 1746, "close": 1760, "high": 1760, "low": 1746, "value": 357980, "ccl_hold": 1022054 }, { "day": "20180409", "open": 1764, "close": 1758, "high": 1779, "low": 1755, "value": 585470, "ccl_hold": 1018564 }, { "day": "20180410", "open": 1759, "close": 1749, "high": 1760, "low": 1748, "value": 345002, "ccl_hold": 970826 }, { "day": "20180411", "open": 1750, "close": 1751, "high": 1755, "low": 1747, "value": 203904, "ccl_hold": 970540 }, { "day": "20180412", "open": 1747, "close": 1744, "high": 1752, "low": 1742, "value": 305424, "ccl_hold": 926704 }, { "day": "20180413", "open": 1744, "close": 1748, "high": 1751, "low": 1741, "value": 219384, "ccl_hold": 938118 }, { "day": "20180416", "open": 1746, "close": 1741, "high": 1747, "low": 1741, "value": 162960, "ccl_hold": 932152 }, { "day": "20180417", "open": 1741, "close": 1740, "high": 1743, "low": 1735, "value": 266290, "ccl_hold": 912510 }, { "day": "20180418", "open": 1740, "close": 1738, "high": 1745, "low": 1737, "value": 180122, "ccl_hold": 923042 }, { "day": "20180419", "open": 1738, "close": 1737, "high": 1741, "low": 1733, "value": 218818, "ccl_hold": 921834 }, { "day": "20180420", "open": 1739, "close": 1742, "high": 1751, "low": 1738, "value": 323448, "ccl_hold": 910846 }, { "day": "20180423", "open": 1744, "close": 1741, "high": 1751, "low": 1740, "value": 258060, "ccl_hold": 901960 }, { "day": "20180424", "open": 1742, "close": 1738, "high": 1746, "low": 1738, "value": 170360, "ccl_hold": 890336 }, { "day": "20180425", "open": 1738, "close": 1737, "high": 1743, "low": 1734, "value": 193032, "ccl_hold": 889444 }, { "day": "20180426", "open": 1737, "close": 1727, "high": 1738, "low": 1724, "value": 311920, "ccl_hold": 899162 }, { "day": "20180427", "open": 1728, "close": 1731, "high": 1734, "low": 1724, "value": 228734, "ccl_hold": 865760 }, { "day": "20180502", "open": 1732, "close": 1736, "high": 1741, "low": 1728, "value": 246604, "ccl_hold": 862966 }, { "day": "20180503", "open": 1737, "close": 1739, "high": 1740, "low": 1732, "value": 185386, "ccl_hold": 865428 }, { "day": "20180504", "open": 1739, "close": 1744, "high": 1747, "low": 1735, "value": 243894, "ccl_hold": 851456 }, { "day": "20180507", "open": 1744, "close": 1742, "high": 1746, "low": 1736, "value": 217812, "ccl_hold": 825518 }, { "day": "20180508", "open": 1742, "close": 1744, "high": 1746, "low": 1738, "value": 210818, "ccl_hold": 801880 }, { "day": "20180509", "open": 1746, "close": 1747, "high": 1752, "low": 1744, "value": 189328, "ccl_hold": 813494 }, { "day": "20180510", "open": 1749, "close": 1752, "high": 1756, "low": 1748, "value": 187832, "ccl_hold": 802514 }, { "day": "20180511", "open": 1752, "close": 1754, "high": 1755, "low": 1748, "value": 137598, "ccl_hold": 788706 }, { "day": "20180514", "open": 1754, "close": 1763, "high": 1770, "low": 1752, "value": 364060, "ccl_hold": 785500 }, { "day": "20180515", "open": 1762, "close": 1767, "high": 1767, "low": 1757, "value": 222558, "ccl_hold": 788328 }, { "day": "20180516", "open": 1766, "close": 1770, "high": 1771, "low": 1765, "value": 192216, "ccl_hold": 797624 }, { "day": "20180517", "open": 1769, "close": 1768, "high": 1775, "low": 1765, "value": 230868, "ccl_hold": 803584 }, { "day": "20180518", "open": 1770, "close": 1772, "high": 1773, "low": 1752, "value": 373630, "ccl_hold": 776006 }, { "day": "20180521", "open": 1774, "close": 1780, "high": 1782, "low": 1763, "value": 332946, "ccl_hold": 801836 }, { "day": "20180522", "open": 1779, "close": 1769, "high": 1780, "low": 1768, "value": 187138, "ccl_hold": 794254 }, { "day": "20180523", "open": 1769, "close": 1764, "high": 1776, "low": 1760, "value": 297758, "ccl_hold": 770668 }, { "day": "20180524", "open": 1766, "close": 1785, "high": 1794, "low": 1766, "value": 532980, "ccl_hold": 836984 }, { "day": "20180525", "open": 1785, "close": 1779, "high": 1785, "low": 1775, "value": 207612, "ccl_hold": 815322 }, { "day": "20180528", "open": 1779, "close": 1784, "high": 1792, "low": 1777, "value": 257316, "ccl_hold": 828836 }, { "day": "20180529", "open": 1784, "close": 1788, "high": 1792, "low": 1779, "value": 282724, "ccl_hold": 843154 }, { "day": "20180530", "open": 1784, "close": 1780, "high": 1795, "low": 1778, "value": 319812, "ccl_hold": 823412 }, { "day": "20180531", "open": 1784, "close": 1777, "high": 1788, "low": 1774, "value": 274518, "ccl_hold": 819374 }, { "day": "20180601", "open": 1778, "close": 1768, "high": 1783, "low": 1765, "value": 341808, "ccl_hold": 785506 }, { "day": "20180604", "open": 1769, "close": 1768, "high": 1773, "low": 1762, "value": 193384, "ccl_hold": 784958 }, { "day": "20180605", "open": 1765, "close": 1762, "high": 1767, "low": 1758, "value": 307826, "ccl_hold": 729384 }, { "day": "20180606", "open": 1764, "close": 1763, "high": 1766, "low": 1760, "value": 122826, "ccl_hold": 721002 }, { "day": "20180607", "open": 1760, "close": 1767, "high": 1769, "low": 1760, "value": 161078, "ccl_hold": 706620 }, { "day": "20180608", "open": 1766, "close": 1755, "high": 1771, "low": 1754, "value": 302108, "ccl_hold": 644690 }, { "day": "20180611", "open": 1755, "close": 1753, "high": 1759, "low": 1752, "value": 174422, "ccl_hold": 616958 }, { "day": "20180612", "open": 1752, "close": 1753, "high": 1756, "low": 1751, "value": 134148, "ccl_hold": 606672 }, { "day": "20180613", "open": 1753, "close": 1756, "high": 1762, "low": 1752, "value": 177456, "ccl_hold": 608812 }, { "day": "20180614", "open": 1756, "close": 1763, "high": 1764, "low": 1753, "value": 167502, "ccl_hold": 615310 }, { "day": "20180615", "open": 1765, "close": 1760, "high": 1770, "low": 1759, "value": 184128, "ccl_hold": 620852 }, { "day": "20180619", "open": 1768, "close": 1763, "high": 1775, "low": 1756, "value": 329432, "ccl_hold": 565506 }, { "day": "20180620", "open": 1763, "close": 1770, "high": 1772, "low": 1761, "value": 171910, "ccl_hold": 572616 }, { "day": "20180621", "open": 1771, "close": 1767, "high": 1775, "low": 1766, "value": 201194, "ccl_hold": 556106 }, { "day": "20180622", "open": 1767, "close": 1767, "high": 1769, "low": 1763, "value": 113564, "ccl_hold": 540540 }, { "day": "20180625", "open": 1767, "close": 1776, "high": 1779, "low": 1764, "value": 232666, "ccl_hold": 559704 }, { "day": "20180626", "open": 1776, "close": 1780, "high": 1784, "low": 1774, "value": 214128, "ccl_hold": 570448 }, { "day": "20180627", "open": 1783, "close": 1786, "high": 1790, "low": 1779, "value": 216148, "ccl_hold": 561052 }, { "day": "20180628", "open": 1785, "close": 1781, "high": 1789, "low": 1773, "value": 219914, "ccl_hold": 548772 }, { "day": "20180629", "open": 1781, "close": 1787, "high": 1788, "low": 1780, "value": 189876, "ccl_hold": 553190 }, { "day": "20180702", "open": 1789, "close": 1785, "high": 1792, "low": 1783, "value": 158992, "ccl_hold": 558778 }, { "day": "20180703", "open": 1784, "close": 1786, "high": 1788, "low": 1780, "value": 141890, "ccl_hold": 560758 }, { "day": "20180704", "open": 1787, "close": 1785, "high": 1790, "low": 1782, "value": 110928, "ccl_hold": 550422 }, { "day": "20180705", "open": 1783, "close": 1778, "high": 1786, "low": 1774, "value": 208660, "ccl_hold": 538936 }, { "day": "20180706", "open": 1779, "close": 1779, "high": 1783, "low": 1774, "value": 170710, "ccl_hold": 515366 }, { "day": "20180709", "open": 1846, "close": 1852, "high": 1860, "low": 1846, "value": 186790, "ccl_hold": 571180 }, { "day": "20180710", "open": 1852, "close": 1843, "high": 1855, "low": 1841, "value": 140172, "ccl_hold": 591044 }, { "day": "20180711", "open": 1844, "close": 1845, "high": 1850, "low": 1843, "value": 135200, "ccl_hold": 614822 }, { "day": "20180712", "open": 1844, "close": 1844, "high": 1847, "low": 1840, "value": 138236, "ccl_hold": 640778 }, { "day": "20180713", "open": 1845, "close": 1848, "high": 1851, "low": 1841, "value": 187566, "ccl_hold": 657480 }, { "day": "20180716", "open": 1847, "close": 1863, "high": 1879, "low": 1847, "value": 664818, "ccl_hold": 716138 }, { "day": "20180717", "open": 1865, "close": 1862, "high": 1869, "low": 1858, "value": 220550, "ccl_hold": 701194 }, { "day": "20180718", "open": 1863, "close": 1862, "high": 1865, "low": 1858, "value": 120162, "ccl_hold": 699898 }, { "day": "20180719", "open": 1864, "close": 1861, "high": 1867, "low": 1859, "value": 120386, "ccl_hold": 693598 }, { "day": "20180720", "open": 1864, "close": 1858, "high": 1865, "low": 1857, "value": 142120, "ccl_hold": 686568 }, { "day": "20180723", "open": 1858, "close": 1835, "high": 1862, "low": 1823, "value": 403160, "ccl_hold": 673982 }, { "day": "20180724", "open": 1835, "close": 1840, "high": 1843, "low": 1835, "value": 176732, "ccl_hold": 691210 }, { "day": "20180725", "open": 1842, "close": 1835, "high": 1843, "low": 1835, "value": 173678, "ccl_hold": 686226 }, { "day": "20180726", "open": 1836, "close": 1837, "high": 1838, "low": 1832, "value": 135062, "ccl_hold": 680698 }, { "day": "20180727", "open": 1836, "close": 1830, "high": 1837, "low": 1830, "value": 154054, "ccl_hold": 675120 }, { "day": "20180730", "open": 1831, "close": 1844, "high": 1845, "low": 1827, "value": 261498, "ccl_hold": 675258 }, { "day": "20180731", "open": 1844, "close": 1854, "high": 1857, "low": 1842, "value": 302822, "ccl_hold": 653722 }, { "day": "20180801", "open": 1855, "close": 1855, "high": 1856, "low": 1850, "value": 183134, "ccl_hold": 656344 }, { "day": "20180802", "open": 1854, "close": 1851, "high": 1861, "low": 1849, "value": 226836, "ccl_hold": 654784 }, { "day": "20180803", "open": 1853, "close": 1845, "high": 1856, "low": 1842, "value": 208944, "ccl_hold": 645550 }, { "day": "20180806", "open": 1848, "close": 1872, "high": 1874, "low": 1846, "value": 591340, "ccl_hold": 729656 }, { "day": "20180807", "open": 1873, "close": 1869, "high": 1876, "low": 1864, "value": 349090, "ccl_hold": 741000 }, { "day": "20180808", "open": 1871, "close": 1888, "high": 1897, "low": 1866, "value": 692832, "ccl_hold": 852736 }, { "day": "20180809", "open": 1889, "close": 1874, "high": 1898, "low": 1871, "value": 576604, "ccl_hold": 866918 }, { "day": "20180810", "open": 1875, "close": 1874, "high": 1885, "low": 1871, "value": 358762, "ccl_hold": 860558 }, { "day": "20180813", "open": 1870, "close": 1893, "high": 1905, "low": 1867, "value": 667978, "ccl_hold": 933736 }, { "day": "20180814", "open": 1896, "close": 1892, "high": 1901, "low": 1886, "value": 388650, "ccl_hold": 921824 }, { "day": "20180815", "open": 1893, "close": 1892, "high": 1900, "low": 1888, "value": 331492, "ccl_hold": 929018 }, { "day": "20180816", "open": 1887, "close": 1883, "high": 1891, "low": 1880, "value": 429460, "ccl_hold": 858638 }, { "day": "20180817", "open": 1882, "close": 1865, "high": 1882, "low": 1863, "value": 541186, "ccl_hold": 833222 }, { "day": "20180820", "open": 1872, "close": 1873, "high": 1880, "low": 1865, "value": 321816, "ccl_hold": 838784 }, { "day": "20180821", "open": 1873, "close": 1869, "high": 1878, "low": 1868, "value": 260076, "ccl_hold": 834052 }, { "day": "20180822", "open": 1868, "close": 1884, "high": 1885, "low": 1868, "value": 384478, "ccl_hold": 852206 }, { "day": "20180823", "open": 1884, "close": 1878, "high": 1900, "low": 1878, "value": 789534, "ccl_hold": 867696 }, { "day": "20180824", "open": 1878, "close": 1876, "high": 1882, "low": 1873, "value": 268926, "ccl_hold": 852406 }, { "day": "20180827", "open": 1880, "close": 1882, "high": 1892, "low": 1875, "value": 377234, "ccl_hold": 873542 }, { "day": "20180828", "open": 1882, "close": 1887, "high": 1890, "low": 1878, "value": 351540, "ccl_hold": 898856 }, { "day": "20180829", "open": 1890, "close": 1877, "high": 1890, "low": 1876, "value": 262490, "ccl_hold": 922536 }, { "day": "20180830", "open": 1878, "close": 1884, "high": 1886, "low": 1877, "value": 261880, "ccl_hold": 898268 }, { "day": "20180831", "open": 1885, "close": 1904, "high": 1908, "low": 1882, "value": 790616, "ccl_hold": 1040232 }, { "day": "20180903", "open": 1904, "close": 1924, "high": 1925, "low": 1898, "value": 726694, "ccl_hold": 1160068 }, { "day": "20180904", "open": 1922, "close": 1915, "high": 1939, "low": 1912, "value": 936798, "ccl_hold": 1196336 }, { "day": "20180905", "open": 1916, "close": 1916, "high": 1922, "low": 1909, "value": 385454, "ccl_hold": 1193810 }, { "day": "20180906", "open": 1918, "close": 1914, "high": 1931, "low": 1907, "value": 603330, "ccl_hold": 1178258 }, { "day": "20180907", "open": 1919, "close": 1914, "high": 1920, "low": 1911, "value": 339784, "ccl_hold": 1140664 }, { "day": "20180910", "open": 1916, "close": 1924, "high": 1929, "low": 1916, "value": 573938, "ccl_hold": 1156274 }, { "day": "20180911", "open": 1923, "close": 1918, "high": 1929, "low": 1913, "value": 408692, "ccl_hold": 1133742 }, { "day": "20180912", "open": 1920, "close": 1904, "high": 1921, "low": 1902, "value": 577552, "ccl_hold": 1008680 }, { "day": "20180913", "open": 1898, "close": 1882, "high": 1900, "low": 1881, "value": 589816, "ccl_hold": 890864 }, { "day": "20180914", "open": 1883, "close": 1880, "high": 1885, "low": 1877, "value": 296628, "ccl_hold": 857270 }, { "day": "20180917", "open": 1883, "close": 1884, "high": 1886, "low": 1879, "value": 211494, "ccl_hold": 841482 }, { "day": "20180918", "open": 1886, "close": 1885, "high": 1895, "low": 1881, "value": 328594, "ccl_hold": 828530 }, { "day": "20180919", "open": 1883, "close": 1888, "high": 1888, "low": 1880, "value": 185904, "ccl_hold": 834544 }, { "day": "20180920", "open": 1888, "close": 1893, "high": 1894, "low": 1886, "value": 251364, "ccl_hold": 825490 }, { "day": "20180921", "open": 1894, "close": 1882, "high": 1901, "low": 1881, "value": 403876, "ccl_hold": 840336 }, { "day": "20180925", "open": 1878, "close": 1861, "high": 1880, "low": 1858, "value": 536004, "ccl_hold": 780844 }, { "day": "20180926", "open": 1864, "close": 1858, "high": 1869, "low": 1857, "value": 244692, "ccl_hold": 779744 }, { "day": "20180927", "open": 1860, "close": 1853, "high": 1860, "low": 1850, "value": 298218, "ccl_hold": 738838 }, { "day": "20180928", "open": 1855, "close": 1847, "high": 1856, "low": 1845, "value": 233896, "ccl_hold": 724998 }, { "day": "20181008", "open": 1847, "close": 1864, "high": 1866, "low": 1845, "value": 471992, "ccl_hold": 780960 }, { "day": "20181009", "open": 1864, "close": 1864, "high": 1869, "low": 1859, "value": 319186, "ccl_hold": 816160 }, { "day": "20181010", "open": 1864, "close": 1846, "high": 1866, "low": 1840, "value": 553168, "ccl_hold": 843688 }, { "day": "20181011", "open": 1843, "close": 1867, "high": 1867, "low": 1841, "value": 534470, "ccl_hold": 827952 }, { "day": "20181012", "open": 1867, "close": 1863, "high": 1869, "low": 1857, "value": 309552, "ccl_hold": 818406 }, { "day": "20181015", "open": 1866, "close": 1854, "high": 1871, "low": 1848, "value": 390726, "ccl_hold": 832066 }, { "day": "20181016", "open": 1855, "close": 1855, "high": 1859, "low": 1850, "value": 242994, "ccl_hold": 840668 }, { "day": "20181017", "open": 1855, "close": 1858, "high": 1859, "low": 1851, "value": 172962, "ccl_hold": 837480 }, { "day": "20181018", "open": 1860, "close": 1868, "high": 1873, "low": 1858, "value": 419626, "ccl_hold": 813426 }, { "day": "20181019", "open": 1868, "close": 1876, "high": 1884, "low": 1865, "value": 522032, "ccl_hold": 839266 }, { "day": "20181022", "open": 1880, "close": 1888, "high": 1891, "low": 1879, "value": 470618, "ccl_hold": 830998 }, { "day": "20181023", "open": 1890, "close": 1883, "high": 1895, "low": 1882, "value": 312486, "ccl_hold": 832150 }, { "day": "20181024", "open": 1882, "close": 1886, "high": 1887, "low": 1876, "value": 271314, "ccl_hold": 812676 }, { "day": "20181025", "open": 1886, "close": 1891, "high": 1895, "low": 1884, "value": 361858, "ccl_hold": 796402 }, { "day": "20181026", "open": 1891, "close": 1891, "high": 1898, "low": 1882, "value": 381078, "ccl_hold": 786974 }, { "day": "20181029", "open": 1894, "close": 1897, "high": 1897, "low": 1885, "value": 334854, "ccl_hold": 826702 }, { "day": "20181030", "open": 1898, "close": 1910, "high": 1913, "low": 1896, "value": 443446, "ccl_hold": 830594 }, { "day": "20181031", "open": 1909, "close": 1891, "high": 1909, "low": 1885, "value": 444266, "ccl_hold": 764896 }, { "day": "20181101", "open": 1892, "close": 1890, "high": 1896, "low": 1887, "value": 250252, "ccl_hold": 761208 }, { "day": "20181102", "open": 1878, "close": 1880, "high": 1886, "low": 1862, "value": 442994, "ccl_hold": 713294 }, { "day": "20181105", "open": 1880, "close": 1888, "high": 1894, "low": 1878, "value": 249324, "ccl_hold": 730426 }, { "day": "20181106", "open": 1890, "close": 1889, "high": 1893, "low": 1881, "value": 209662, "ccl_hold": 699680 }, { "day": "20181107", "open": 1891, "close": 1893, "high": 1906, "low": 1888, "value": 377114, "ccl_hold": 709180 }, { "day": "20181108", "open": 1892, "close": 1895, "high": 1899, "low": 1890, "value": 202586, "ccl_hold": 692804 }, { "day": "20181109", "open": 1898, "close": 1916, "high": 1916, "low": 1895, "value": 404448, "ccl_hold": 732520 }, { "day": "20181112", "open": 1921, "close": 1921, "high": 1942, "low": 1916, "value": 712394, "ccl_hold": 774176 }, { "day": "20181113", "open": 1921, "close": 1911, "high": 1923, "low": 1901, "value": 396002, "ccl_hold": 759704 }, { "day": "20181114", "open": 1992, "close": 1987, "high": 1997, "low": 1980, "value": 273624, "ccl_hold": 780164 }, { "day": "20181115", "open": 1990, "close": 1965, "high": 1992, "low": 1963, "value": 351998, "ccl_hold": 837352 }, { "day": "20181116", "open": 1967, "close": 1975, "high": 1980, "low": 1967, "value": 199034, "ccl_hold": 853692 }, { "day": "20181119", "open": 1974, "close": 1982, "high": 1987, "low": 1968, "value": 286946, "ccl_hold": 865364 }, { "day": "20181120", "open": 1985, "close": 1964, "high": 1986, "low": 1961, "value": 362116, "ccl_hold": 892158 }, { "day": "20181121", "open": 1959, "close": 1966, "high": 1976, "low": 1954, "value": 480444, "ccl_hold": 897076 }, { "day": "20181122", "open": 1964, "close": 1949, "high": 1970, "low": 1943, "value": 513834, "ccl_hold": 974618 }, { "day": "20181123", "open": 1953, "close": 1952, "high": 1960, "low": 1948, "value": 351010, "ccl_hold": 952086 }, { "day": "20181126", "open": 1957, "close": 1955, "high": 1962, "low": 1951, "value": 365468, "ccl_hold": 958408 }, { "day": "20181127", "open": 1956, "close": 1965, "high": 1965, "low": 1952, "value": 462576, "ccl_hold": 907368 }, { "day": "20181128", "open": 1966, "close": 1972, "high": 1973, "low": 1953, "value": 458550, "ccl_hold": 921912 }, { "day": "20181129", "open": 1972, "close": 1958, "high": 1976, "low": 1958, "value": 430240, "ccl_hold": 945362 }, { "day": "20181130", "open": 1958, "close": 1953, "high": 1961, "low": 1947, "value": 514048, "ccl_hold": 986794 }, { "day": "20181203", "open": 1930, "close": 1912, "high": 1942, "low": 1896, "value": 1225472, "ccl_hold": 995848 }, { "day": "20181204", "open": 1909, "close": 1879, "high": 1913, "low": 1875, "value": 897616, "ccl_hold": 1030106 }, { "day": "20181205", "open": 1880, "close": 1884, "high": 1895, "low": 1871, "value": 684430, "ccl_hold": 1027094 }, { "day": "20181206", "open": 1886, "close": 1888, "high": 1894, "low": 1879, "value": 478424, "ccl_hold": 1019416 }, { "day": "20181207", "open": 1883, "close": 1861, "high": 1886, "low": 1857, "value": 702144, "ccl_hold": 1071994 }, { "day": "20181210", "open": 1860, "close": 1865, "high": 1872, "low": 1860, "value": 380528, "ccl_hold": 1110220 }, { "day": "20181211", "open": 1864, "close": 1871, "high": 1877, "low": 1861, "value": 408158, "ccl_hold": 1123540 }, { "day": "20181212", "open": 1871, "close": 1870, "high": 1876, "low": 1866, "value": 288646, "ccl_hold": 1128344 }, { "day": "20181213", "open": 1869, "close": 1874, "high": 1875, "low": 1865, "value": 239956, "ccl_hold": 1113046 }, { "day": "20181214", "open": 1874, "close": 1872, "high": 1877, "low": 1856, "value": 480380, "ccl_hold": 1135266 }, { "day": "20181217", "open": 1865, "close": 1861, "high": 1868, "low": 1857, "value": 340362, "ccl_hold": 1152418 }, { "day": "20181218", "open": 1861, "close": 1850, "high": 1861, "low": 1848, "value": 439818, "ccl_hold": 1206394 }, { "day": "20181219", "open": 1850, "close": 1871, "high": 1876, "low": 1848, "value": 582534, "ccl_hold": 1173130 }, { "day": "20181220", "open": 1870, "close": 1870, "high": 1874, "low": 1866, "value": 309074, "ccl_hold": 1158210 }, { "day": "20181221", "open": 1870, "close": 1863, "high": 1870, "low": 1861, "value": 282104, "ccl_hold": 1151832 }, { "day": "20181224", "open": 1857, "close": 1831, "high": 1859, "low": 1831, "value": 556722, "ccl_hold": 1200796 }, { "day": "20181225", "open": 1833, "close": 1847, "high": 1853, "low": 1832, "value": 513836, "ccl_hold": 1180746 }, { "day": "20181226", "open": 1846, "close": 1855, "high": 1860, "low": 1845, "value": 453410, "ccl_hold": 1178332 }, { "day": "20181227", "open": 1858, "close": 1851, "high": 1861, "low": 1846, "value": 350892, "ccl_hold": 1178336 }, { "day": "20181228", "open": 1855, "close": 1869, "high": 1870, "low": 1854, "value": 441448, "ccl_hold": 1160368 }, { "day": "20190102", "open": 1865, "close": 1861, "high": 1865, "low": 1857, "value": 259584, "ccl_hold": 1144562 }, { "day": "20190103", "open": 1865, "close": 1870, "high": 1872, "low": 1860, "value": 301634, "ccl_hold": 1115354 }, { "day": "20190104", "open": 1870, "close": 1863, "high": 1871, "low": 1859, "value": 329878, "ccl_hold": 1123756 }, { "day": "20190107", "open": 1865, "close": 1853, "high": 1867, "low": 1848, "value": 444886, "ccl_hold": 1151884 }, { "day": "20190108", "open": 1852, "close": 1838, "high": 1852, "low": 1835, "value": 426088, "ccl_hold": 1208024 }, { "day": "20190109", "open": 1839, "close": 1843, "high": 1845, "low": 1836, "value": 253208, "ccl_hold": 1193506 }, { "day": "20190110", "open": 1841, "close": 1835, "high": 1843, "low": 1832, "value": 270540, "ccl_hold": 1210994 }, { "day": "20190111", "open": 1837, "close": 1826, "high": 1837, "low": 1823, "value": 396212, "ccl_hold": 1252256 }, { "day": "20190114", "open": 1818, "close": 1811, "high": 1818, "low": 1803, "value": 511130, "ccl_hold": 1284000 }, { "day": "20190115", "open": 1811, "close": 1810, "high": 1814, "low": 1806, "value": 236390, "ccl_hold": 1288094 }, { "day": "20190116", "open": 1806, "close": 1826, "high": 1830, "low": 1802, "value": 563174, "ccl_hold": 1245066 }, { "day": "20190117", "open": 1826, "close": 1820, "high": 1828, "low": 1814, "value": 334108, "ccl_hold": 1272858 }, { "day": "20190118", "open": 1819, "close": 1824, "high": 1827, "low": 1817, "value": 299170, "ccl_hold": 1277842 }, { "day": "20190121", "open": 1825, "close": 1833, "high": 1838, "low": 1825, "value": 421342, "ccl_hold": 1263454 }, { "day": "20190122", "open": 1835, "close": 1842, "high": 1845, "low": 1832, "value": 513282, "ccl_hold": 1266240 }, { "day": "20190123", "open": 1842, "close": 1839, "high": 1848, "low": 1835, "value": 335588, "ccl_hold": 1235646 }, { "day": "20190124", "open": 1839, "close": 1836, "high": 1839, "low": 1829, "value": 322884, "ccl_hold": 1217824 }, { "day": "20190125", "open": 1840, "close": 1863, "high": 1872, "low": 1840, "value": 777404, "ccl_hold": 1178058 }, { "day": "20190128", "open": 1859, "close": 1854, "high": 1860, "low": 1851, "value": 254460, "ccl_hold": 1123954 }, { "day": "20190129", "open": 1855, "close": 1857, "high": 1859, "low": 1853, "value": 213202, "ccl_hold": 1112126 }, { "day": "20190130", "open": 1859, "close": 1865, "high": 1867, "low": 1857, "value": 221540, "ccl_hold": 1079770 }, { "day": "20190131", "open": 1864, "close": 1863, "high": 1868, "low": 1852, "value": 299412, "ccl_hold": 1034298 }, { "day": "20190201", "open": 1866, "close": 1873, "high": 1875, "low": 1861, "value": 240332, "ccl_hold": 991844 }, { "day": "20190211", "open": 1874, "close": 1865, "high": 1875, "low": 1859, "value": 236362, "ccl_hold": 992240 }, { "day": "20190212", "open": 1867, "close": 1861, "high": 1871, "low": 1859, "value": 229750, "ccl_hold": 1005812 }, { "day": "20190213", "open": 1861, "close": 1849, "high": 1861, "low": 1849, "value": 251392, "ccl_hold": 1019452 }, { "day": "20190214", "open": 1848, "close": 1832, "high": 1849, "low": 1832, "value": 390790, "ccl_hold": 1052738 }, { "day": "20190215", "open": 1831, "close": 1836, "high": 1839, "low": 1827, "value": 277436, "ccl_hold": 1044478 }, { "day": "20190218", "open": 1828, "close": 1816, "high": 1828, "low": 1811, "value": 410646, "ccl_hold": 1025798 }, { "day": "20190219", "open": 1815, "close": 1823, "high": 1828, "low": 1812, "value": 392494, "ccl_hold": 1029152 }, { "day": "20190220", "open": 1820, "close": 1806, "high": 1820, "low": 1806, "value": 341824, "ccl_hold": 1065796 }, { "day": "20190221", "open": 1807, "close": 1808, "high": 1818, "low": 1806, "value": 336028, "ccl_hold": 1077130 }, { "day": "20190222", "open": 1807, "close": 1811, "high": 1815, "low": 1803, "value": 292162, "ccl_hold": 1065920 }, { "day": "20190225", "open": 1790, "close": 1784, "high": 1791, "low": 1780, "value": 582844, "ccl_hold": 1073244 }, { "day": "20190226", "open": 1783, "close": 1791, "high": 1804, "low": 1781, "value": 556032, "ccl_hold": 1104728 }, { "day": "20190227", "open": 1792, "close": 1795, "high": 1802, "low": 1791, "value": 310130, "ccl_hold": 1138372 }, { "day": "20190228", "open": 1796, "close": 1821, "high": 1822, "low": 1795, "value": 558722, "ccl_hold": 1159682 }, { "day": "20190301", "open": 1825, "close": 1820, "high": 1828, "low": 1816, "value": 447696, "ccl_hold": 1130846 }, { "day": "20190304", "open": 1825, "close": 1814, "high": 1833, "low": 1812, "value": 423934, "ccl_hold": 1111440 }, { "day": "20190305", "open": 1811, "close": 1824, "high": 1825, "low": 1810, "value": 324184, "ccl_hold": 1134746 }, { "day": "20190306", "open": 1818, "close": 1819, "high": 1820, "low": 1811, "value": 353650, "ccl_hold": 1114562 }, { "day": "20190307", "open": 1815, "close": 1831, "high": 1847, "low": 1812, "value": 595826, "ccl_hold": 1050978 }, { "day": "20190308", "open": 1828, "close": 1828, "high": 1836, "low": 1823, "value": 351814, "ccl_hold": 1028432 }, { "day": "20190311", "open": 1826, "close": 1835, "high": 1839, "low": 1821, "value": 384468, "ccl_hold": 1023220 }, { "day": "20190312", "open": 1835, "close": 1844, "high": 1846, "low": 1835, "value": 404004, "ccl_hold": 1000448 }, { "day": "20190313", "open": 1847, "close": 1829, "high": 1849, "low": 1827, "value": 551496, "ccl_hold": 990920 }, { "day": "20190314", "open": 1831, "close": 1838, "high": 1842, "low": 1828, "value": 336440, "ccl_hold": 1030308 }, { "day": "20190315", "open": 1837, "close": 1847, "high": 1851, "low": 1837, "value": 391262, "ccl_hold": 1010336 }, { "day": "20190318", "open": 1850, "close": 1856, "high": 1858, "low": 1844, "value": 304410, "ccl_hold": 1011010 }, { "day": "20190319", "open": 1859, "close": 1850, "high": 1859, "low": 1847, "value": 290638, "ccl_hold": 1017044 }, { "day": "20190320", "open": 1850, "close": 1831, "high": 1850, "low": 1828, "value": 465732, "ccl_hold": 996804 }, { "day": "20190321", "open": 1833, "close": 1824, "high": 1835, "low": 1821, "value": 358126, "ccl_hold": 1033562 }, { "day": "20190322", "open": 1820, "close": 1816, "high": 1821, "low": 1810, "value": 417168, "ccl_hold": 988024 }, { "day": "20190325", "open": 1813, "close": 1816, "high": 1821, "low": 1806, "value": 294318, "ccl_hold": 969496 }, { "day": "20190326", "open": 1837, "close": 1847, "high": 1849, "low": 1835, "value": 253804, "ccl_hold": 1027380 }, { "day": "20190327", "open": 1847, "close": 1842, "high": 1853, "low": 1839, "value": 394670, "ccl_hold": 1071366 }, { "day": "20190328", "open": 1837, "close": 1833, "high": 1842, "low": 1829, "value": 366984, "ccl_hold": 1094398 }, { "day": "20190329", "open": 1835, "close": 1844, "high": 1848, "low": 1832, "value": 316986, "ccl_hold": 1142300 }, { "day": "20190401", "open": 1845, "close": 1843, "high": 1847, "low": 1831, "value": 402486, "ccl_hold": 1180900 }, { "day": "20190402", "open": 1843, "close": 1852, "high": 1854, "low": 1841, "value": 393164, "ccl_hold": 1231358 }, { "day": "20190403", "open": 1855, "close": 1858, "high": 1861, "low": 1842, "value": 678396, "ccl_hold": 1282350 }, { "day": "20190404", "open": 1863, "close": 1886, "high": 1890, "low": 1861, "value": 1229250, "ccl_hold": 1292854 }, { "day": "20190408", "open": 1886, "close": 1879, "high": 1888, "low": 1876, "value": 617012, "ccl_hold": 1222006 }, { "day": "20190409", "open": 1880, "close": 1867, "high": 1886, "low": 1860, "value": 893702, "ccl_hold": 1165098 }, { "day": "20190410", "open": 1867, "close": 1876, "high": 1882, "low": 1865, "value": 588792, "ccl_hold": 1170922 }, { "day": "20190411", "open": 1879, "close": 1881, "high": 1886, "low": 1873, "value": 524350, "ccl_hold": 1146450 }]

        this.testBoll(data);
    },

    testBoll(data) {
        this.MaList = [];
        this.BollList = [];
        this.VolList = [];
        let data5 = 5, data10 = 10;
        let k = 2, N = 20;

        let EMA1Data = 12, EMA2Data = 26, DEAData = 9;
        let EMA12 = 0, EMA26 = 0;
        let KDJDay = 9;
        this.DIFList = [];
        this.DEAList = [];
        this.MACDList = [];
        this.Klist = [];
        this.Dlist = [];
        this.jList = [];
        this.UPRS = [];
        this.DOWNRS = [];
        this.UPRS12 = [];
        this.DOWNRS12 = [];
        this.UPRS24 = [];
        this.DOWNRS24 = [];
        this.Rs6 = [];
        this.Rs12 = [];
        this.Rs24 = [];
        data.forEach((el, index) => {
            // if (index == N - 1) {
            //     this.BollList[index] = [];
            //     let num = 0;
            //     let i = index + 1 - N;
            //     for (; i <= index; i++) {
            //         num += parseFloat(data[i].close);
            //     }
            //     let MBY = 0
            //     MBY = (num / N)//- this.bottomValue) / this.disValue * drawBox;
            //     //   if (index == N - 1) {
            //     //     this.BollList[index].push(MBY)
            //     // } else {
            //     //  let MD = Math.sqrt(Math.pow(el.close - MBY, 2) / (N));
            //     let it = 0;

            //     for (let t = (index + 1) - N; t <= index; t++) {
            //         console.log(t);
            //         console.log(data[t].close);
            //         it += (Math.pow(data[t].close - MBY, 2));
            //     }

            //     let MD = Math.sqrt(it / (N));

            //     let UP = MBY + k * MD;

            //     let DN = MBY - k * MD;

            //     this.BollList[index].push(MBY)
            //     this.BollList[index].push(UP)
            //     this.BollList[index].push(DN)
            //     this.BollList[index].push(el.day);
            //     //   }
            // } else {
            //     this.BollList.push(null);
            // }
            if (index < KDJDay - 1) {
                this.Klist.push(50);
                this.Dlist.push(50);
                this.jList.push(50);
            }
            let RSV = 0;
            if (index == 0) {
                EMA12 = parseFloat(el.close);
                EMA26 = parseFloat(el.close);
                //   let dif = EMA12 - EMA26;
                this.DIFList.push(0);
                this.DEAList.push(0);
                this.MACDList.push(0);

                // RSV = (el.close - el.low) / (el.high - el.low) * 100;
                // let k = (2 / 3) * 50 + 1 / 3 * RSV;
                // let d = 2 / 3 * 50 + 1 / 3 * k;
                // let j = 3 * k - 2 * d;
                // this.Klist.push(k);
                // this.Dlist.push(d);
                // this.jList.push(j);

                // this.n_high = el.high;
                // this.n_low = el.low;

                this.UPRS.push(0);
                this.DOWNRS.push(0);
                this.UPRS12.push(0);
                this.DOWNRS12.push(0);
                this.UPRS24.push(0);
                this.DOWNRS24.push(0);

            } else {
                EMA12 = (EMA12 * (12 - 1) + parseFloat(el.close) * 2) / (12 + 1);
                EMA26 = (EMA26 * (26 - 1) + parseFloat(el.close) * 2) / (26 + 1);
                let dif = EMA12 - EMA26
                let dea = (this.DIFList[index - 1] * (DEAData - 1) + dif * 2) / (DEAData + 1);
                let macd = (dif - dea) * 2;
                this.DIFList.push(dif);
                this.DEAList.push(dea);
                this.MACDList.push(macd);
                console.log(dif);
                console.log(dea);
                console.log(macd);
                console.log(el.day);

                if (index >= KDJDay - 1) {
                    this.n_low = el.low;
                    this.n_high = el.high;
                    for (let t = (index + 1) - KDJDay; t <= index; t++) {
                        this.n_low = Math.min(this.n_low, data[t].low);
                        this.n_high = Math.max(this.n_high, data[t].high);
                    }
                    RSV = (el.close - this.n_low) / (this.n_high - this.n_low) * 100;
                    let k = (2 / 3) * this.Klist[this.Klist.length - 1] + 1 / 3 * RSV;
                    let d = (2 / 3) * this.Dlist[this.Dlist.length - 1] + 1 / 3 * k;
                    let j = 3 * k - 2 * d;
                    this.Klist.push(k);
                    this.Dlist.push(d);
                    this.jList.push(j);
                    // console.log(k);
                    // console.log(d);
                    // console.log(j);
                    // console.log(el.day);
                }


                if (el.close < data[index - 1].close) {

                    this.DOWNRS.push(this.DOWNRS[index - 1] * 5 / 6 + (data[index - 1].close - el.close) / 6)
                    this.UPRS.push(this.UPRS[index - 1] * 5 / 6 + (0) / 6);

                    this.UPRS12.push(this.UPRS12[index - 1] * 11 / 12 + (0) / 12)
                    this.DOWNRS12.push(this.DOWNRS12[index - 1] * 11 / 12 + (data[index - 1].close - el.close) / 12);

                    this.UPRS24.push(this.UPRS24[index - 1] * 23 / 24 + (0) / 24)
                    this.DOWNRS24.push(this.DOWNRS24[index - 1] * 23 / 24 + (data[index - 1].close - el.close) / 24);

                } else {

                    this.DOWNRS.push(this.DOWNRS[index - 1] * 5 / 6 + (0) / 6)
                    this.UPRS.push(this.UPRS[index - 1] * 5 / 6 + (el.close - data[index - 1].close) / 6);

                    this.UPRS12.push(this.UPRS12[index - 1] * 11 / 12 + (el.close - data[index - 1].close) / 12)
                    this.DOWNRS12.push(this.DOWNRS12[index - 1] * 11 / 12 + (0) / 12);

                    this.UPRS24.push(this.UPRS24[index - 1] * 23 / 24 + (el.close - data[index - 1].close) / 24)
                    this.DOWNRS24.push(this.DOWNRS24[index - 1] * 23 / 24 + (0) / 24);
                }

                if (index >= 5) {
                    //    let rs = index + 1 - 6;
                    let UP6 = 0, DOWN6 = 0;
                    // for (; rs <= index; rs++) {
                    //     UP6 += this.UPRS[rs];
                    //     DOWN6 += this.DOWNRS[rs];
                    // }
                    //    UP6 = this.UPRS[index] / this.DOWNRS[index];
                    UP6 = this.UPRS[index];
                    DOWN6 = this.DOWNRS[index];
                    let RS;
                    if (DOWN6 == 0) {
                        RS = 0;
                    } else {
                        // UP6 = UP6 / 6;
                        // DOWN6 = DOWN6 / 6;
                        // let curUP = 0;
                        // let curDO = 0;
                        // if (this.UPRS[index]) {
                        //     curUP = this.UPRS[index]
                        // } else {
                        //     curDO = this.DOWNRS[index];
                        // }
                        // RS = (UP6 * 5 / 6 + curUP / 6) / (DOWN6 * 5 / 6 + curDO / 6);
                        RS = (UP6) / (DOWN6);
                    }

                    this.Rs6.push(100 * RS / (1 + RS));
                    // console.log(100 * RS / (1 + RS));
                    // console.log(el.day);
                } else {
                    this.Rs6.push(null);
                }
                if (index >= 11) {
                    //  let rs = index + 1 - 12;
                    let UP12 = 0, DOWN12 = 0;
                    // for (; rs <= index; rs++) {
                    //     UP12 += this.UPRS[rs];
                    //     DOWN12 += this.DOWNRS[rs];
                    // }
                    UP12 = this.UPRS12[index];
                    DOWN12 = this.DOWNRS12[index];
                    let RS;
                    {
                        // UP12 = UP12 / 12;
                        // DOWN12 = DOWN12 / 12;
                        // let curUP = 0;
                        // let curDO = 0;
                        // if (this.UPRS[index]) {
                        //     curUP = this.UPRS[index]
                        // } else {
                        //     curDO = this.DOWNRS[index];
                        // }
                        // RS = (UP12 * 11 / 12 + curUP / 12) / (DOWN12 * 11 / 12 + curDO / 12);
                        RS = UP12 / DOWN12;
                    }

                    this.Rs12.push(100 * RS / (1 + RS));
                    // console.log(100 * RS / (1 + RS));
                    // console.log(el.day);

                } else {
                    this.Rs12.push(null);
                }

                if (index >= 23) {
                    //  let rs = index + 1 - 24;
                    let UP24 = 0, DOWN24 = 0;
                    // for (; rs <= index; rs++) {
                    //     UP24 += this.UPRS[rs];
                    //     DOWN24 += this.DOWNRS[rs];
                    // }
                    UP24 = this.UPRS24[index];
                    DOWN24 = this.DOWNRS24[index];
                    let RS;
                    if (DOWN24 == 0) {
                        RS = 0;
                    } else {
                        // UP24 = UP24 / 23;
                        // DOWN24 = DOWN24 / 23;
                        // let curUP = 0;
                        // let curDO = 0;
                        // if (this.UPRS[index]) {
                        //     curUP = this.UPRS[index]
                        // } else {
                        //     curDO = this.DOWNRS[index];
                        // }
                        // RS = (UP24 * 23 / 24 + curUP / 24) / (DOWN24 * 23 / 24 + curDO / 24);
                        RS = UP24 / DOWN24;
                    }

                    this.Rs24.push(100 * RS / (1 + RS));
                    // console.log(100 * RS / (1 + RS));
                    // console.log(el.day);
                } else {
                    this.Rs24.push(null);
                }

            }
        });
        //console.log(JSON.stringify(this.Rs6));
        // this.DEAList.push(dea);
        // this.MACDList.push(macd);)

    },

    testMacd() {

    }

    // update (dt) {},
});
