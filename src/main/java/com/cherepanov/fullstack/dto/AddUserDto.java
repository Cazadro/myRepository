/**
 * @author Illia Cherepanov
 * <p>
 * Copyright (c) 1994, 2022, Oracle and/or its affiliates. All rights reserved.
 * ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 * <p>
 * This software is the confidential and proprietary information of Sun
 * Microsystems, Inc. ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Sun.
 * <p>
 * SUN MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY OF
 * THE SOFTWARE, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE, OR NON-INFRINGEMENT. SUN SHALL NOT BE LIABLE FOR
 * ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
 * DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */

package com.cherepanov.fullstack.dto;

import com.cherepanov.fullstack.student.Gender;
import com.cherepanov.fullstack.student.Student;
import com.cherepanov.fullstack.student.StudentService;
import com.cherepanov.fullstack.validation.EmailUniqConstraint;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author Illia Cherepanov
 * created 30.03.2024
 * @version 1.0
 */
@ComponentScan
@AllArgsConstructor
@Setter
@Getter
public class AddUserDto {

    private StudentService studentService;

    @NotBlank
    @NotEmpty
    private String name;
    @EmailUniqConstraint
    @Email
    private String email;
    @Enumerated(EnumType.STRING)
    @NotNull
    private Gender gender;

    public void addNewStudent(Student student) {
        studentService.addStudent(student);
    }

    public Student toStudent() {
        return new Student(name, email, gender);
    }
}
