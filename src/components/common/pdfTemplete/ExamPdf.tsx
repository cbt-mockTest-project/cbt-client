/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import {
  Document,
  View,
  Font,
  Page,
  StyleSheet,
  Text,
  Image,
  Link,
} from '@react-pdf/renderer';
import palette from '@styles/palette';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    width: '100%',
    colorBg: 'white',
  },
  section: {
    flexDirection: 'column',
    margin: 10,
    padding: 10,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  titleBox: {
    flexDirection: 'row',
    position: 'relative',
    right: 5,
    top: -10,
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  numberBox: {
    display: 'flex',
    borderBottomStyle: 'solid',
    borderBottomWidth: 3,
    borderBottomColor: palette.antd_blue_01,
    width: 70,
  },
  questionBox: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 550,
    padding: 10,
    colorBg: palette.blue_100,
  },
  logoImageBox: {
    width: 50,
  },
  imageBox: {
    marginTop: 12,
    width: '50%',
  },
  solutionBox: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    width: 550,
    position: 'relative',
  },
  blankBox: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    width: 550,
    position: 'absolute',
    top: 10,
    bottom: 0,
    right: 0,
    left: 0,
    colorBg: 'white',
  },
  //font
  titleText: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 12,
    lineHeight: 1.3,
    color: palette.antd_blue_01,
  },
  questionText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    lineHeight: 1.5,
  },
  solutionText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    lineHeight: 1.5,
  },
  solutionLabelText: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 12,
    color: palette.antd_blue_01,
    borderBottomStyle: 'solid',
    borderBottomWidth: 2,
    marginBottom: 5,
    width: 25,

    borderBottomColor: palette.antd_blue_01,
  },
  numberText: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 16,
    color: palette.gray_700,
  },
});

Font.register({
  family: 'NotoSans-Bold',
  src: '/fonts/NotoSansKR-Bold.otf',
});

Font.register({
  family: 'NotoSans-Regular',
  src: '/fonts/NotoSansKR-Regular.otf',
});

interface ExamPdfProps {
  mock: any;
  isHideAnswer: boolean;
}

const ExamPdf: React.FC<ExamPdfProps> = ({ mock, isHideAnswer = false }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.list}>
          {mock.map((item: any, index: number) => (
            <View key={item.number || index + 1} style={styles.section}>
              {index === 0 && (
                <Link src="https://moducbt.com" style={styles.titleBox}>
                  <Image style={styles.logoImageBox} src="/png/logo01.png" />
                  <Text style={styles.titleText}>
                    실기시험 공부는 모두CBT!!
                  </Text>
                </Link>
              )}
              <View style={styles.numberBox}>
                <Text style={styles.numberText}>
                  {`${String(item.number || index + 1).padStart(
                    2,
                    '0'
                  )}번 문제`}
                </Text>
              </View>
              <View style={styles.questionBox}>
                <Text style={styles.questionText}>{item.question}</Text>
                {item.question_img && item.question_img.length > 0 && (
                  <Image
                    style={styles.imageBox}
                    src={item.question_img[0].url}
                  />
                )}
              </View>
              <View style={styles.solutionBox}>
                <Text style={styles.solutionLabelText}>정답</Text>
                <Text style={styles.solutionText}>{item.solution}</Text>
                {item.solution_img && item.solution_img.length > 0 && (
                  <Image
                    style={styles.imageBox}
                    src={item.solution_img[0].url}
                  />
                )}
                {isHideAnswer && <View style={styles.blankBox} />}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ExamPdf;
